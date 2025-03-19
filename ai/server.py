from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import ollama
import json
import logging
import uuid
import asyncio
from typing import List

# Set up logging
logging.basicConfig(level=logging.INFO)

# Instantiate the FastAPI app
app = FastAPI()  # Ensure this line is included to define 'app'

# Dictionary to track user conversations by their unique UUID
user_conversations = {}

class WebSocketManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, websocket: WebSocket, message: dict):
        await websocket.send_json(message)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

# Create WebSocket manager
manager = WebSocketManager()

# WebSocket endpoint
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    try:
        # Accept the WebSocket connection
        await manager.connect(websocket)
        user_id = str(uuid.uuid4())
        user_conversations[user_id] = []

        # Initial greeting message with the prompt for AI
        initial_message = ("Hello! I am your AI assistant. How can I help you today? "
                           "If you need help with choosing a preschool or kindergarten, I can provide advice based on your budget, income, location, and other factors. "
                           "Just let me know what you're looking for!")
        user_conversations[user_id].append({"role": "system", "content": initial_message})
        await manager.send_personal_message(websocket, {"role": "AI", "message": initial_message, "user_id": user_id})

        logging.info(f"User {user_id} connected")

        while True:
            try:
                # Receive message from the user
                data = await websocket.receive_text()
                logging.info(f"Received message: {data}")

                # Parse the incoming data
                request = json.loads(data)
                user_message = request.get("message", "")

                if not user_message:
                    logging.warning("Received an empty message")
                    continue

                # Append the user's message to the conversation history for this user
                user_conversations[user_id].append({"role": "user", "content": user_message})
                logging.info(f"User message added to conversation history for user {user_id}")

                # Generate the AI's response using asyncio.to_thread to avoid blocking
                ai_prompt = f"""
                You are an AI assistant helping a young parent with limited knowledge of preschools or kindergartens in Singapore context only. 
                Refrain from giving advise that are irrelevant to preschools or kindergartens in Singapore. Every question asked is regarding preschools/Kindergartens in Singapore.
                Based on the user's message, provide helpful advice and recommendations considering factors like budget, income, location, curriculum, and the child's needs.

                The user's message: "{user_message}"

                Provide a friendly, clear, and concise response. You can suggest questions for the user to ask schools and help them make a more informed decision.
                """

                # Use asyncio.to_thread to avoid blocking the event loop
                response = await asyncio.to_thread(ollama.chat, model="llama3", messages=user_conversations[user_id] + [{"role": "system", "content": ai_prompt}])
                ai_response = response.get("message", {}).get("content", "Sorry, I couldn't generate a response.")

                # Append the AI's response to the conversation history for this user
                user_conversations[user_id].append({"role": "assistant", "content": ai_response})
                logging.info(f"AI response added to conversation history for user {user_id}")

                # Send the AI response back to the user
                await manager.send_personal_message(websocket, {"role": "AI", "message": ai_response, "user_id": user_id})

            except WebSocketDisconnect:
                # Handle WebSocket disconnect
                logging.info(f"User {user_id} disconnected")
                manager.disconnect(websocket)
                break
            except Exception as e:
                logging.error(f"Error processing message: {e}")
                await manager.send_personal_message(websocket, {"role": "AI", "message": "An error occurred, please try again.", "user_id": user_id})

    except Exception as e:
        logging.error(f"Error with WebSocket connection: {e}")
        await websocket.close()

    finally:
        # Clean up the conversation history when the connection is closed
        if user_id in user_conversations:
            del user_conversations[user_id]
            logging.info(f"User {user_id} disconnected, conversation history cleared.")

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "ok"}
