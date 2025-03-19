import Navigationbar from "../components/navigation/Navigationbar";
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AssistantPage = () => {

    const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading
  const [userId, setUserId] = useState(null); // Track user ID

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_AI);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData.user_id) {
        // Store user_id when received
        setUserId(messageData.user_id);
      }
      setMessages((prev) => [...prev, messageData]);
      setLoading(false); // Hide loading when response is received
    };

    ws.onclose = (e) => {
      console.log("WebSocket closed:", e);
    };

    setSocket(ws);
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input.trim()) {
      const userMessage = { message: input };
      setMessages((prev) => [...prev, { role: "user", message: input }]);
      setInput("");
      setLoading(true); // Set loading to true when message is sent
      socket.send(JSON.stringify(userMessage));
    }
  };

  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === "Enter") {
      sendMessage();
    }
  };

  const styles = {
    container: { flex: 1, padding: 10 },
    input: { height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
    aiText: { backgroundColor: "#e1e1e1", padding: 10, marginVertical: 5 },
    userText: { backgroundColor: "#add8e6", padding: 10, marginVertical: 5, alignSelf: "flex-end" },
    loadingContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10,
    },
    loadingText: {
      marginLeft: 10,
      fontSize: 16,
      color: "#0000ff",
    },
  }

  // Render the chat UI
  return (
    <>
    <Navigationbar />
    <div>
        {
            messages.map((m, index) => (
                <div key={index} style={m.role === "AI" ? styles.aiText : styles.userText}>
                    {m.message}
                </div>
            ))
        }

    </div>
      <input
        style={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        editable={!loading} // Disable input when loading
        onKeyDown={handleKeyPress} // Listen for the Enter key press
      />
      <div disabled={loading} className="btn-primary" onClick={sendMessage}>
        Send
      </div>
      
      {/* Show loading spinner if loading is true */}
      {loading && (
        <div className="text-center"><div className="spinner-grow" role="status"></div></div>
      )}
    </>
    
  );
};
 
export default AssistantPage;