# TO RUN SERVER
#  uvicorn server:app --port 8081 --reload

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import smtplib
import os
from dotenv import load_dotenv
load_dotenv()

EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")


app = FastAPI()

class EmailRequest(BaseModel):
    receiver: str
    subject: str
    body: str

def send_email(receiver: str, subject: str, body: str):
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL, PASSWORD)
        message = f"Subject: {subject}\n\n{body}"
        server.sendmail(EMAIL, receiver, message)
        server.quit()
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/send-email")
def send_email_api(request: EmailRequest):
    try:
        send_email(request.receiver, request.subject, request.body)
        print(True)
        return {"result": True}
    except Exception as e:
        print(e)
        return {"result": False}
