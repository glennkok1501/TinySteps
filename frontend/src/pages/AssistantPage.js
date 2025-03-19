import Navigationbar from "../components/navigation/Navigationbar";
import React, { useState, useEffect, useRef } from "react";

const AssistantPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_AI);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      setConnected(true);
      setError(false);
    };

    ws.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data);
        setMessages((prev) => [...prev, messageData]);
      } catch (err) {
        console.error("Error parsing message:", err);
        setError(true);
      }
      setLoading(false);
    };

    ws.onerror = (err) => {
      console.error("WebSocket Error:", err);
      setError(true);
      setConnected(false);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setConnected(false);
    };

    setSocket(ws);
    return () => ws.close();
  }, []);


  const sendMessage = () => {
    if (socket && input.trim()) {
      const userMessage = { message: input };
      setMessages((prev) => [...prev, { role: "user", message: input }]);

      setInput("");
      setLoading(true);
      socket.send(JSON.stringify(userMessage));
    }
  };

  useEffect(() => {
    if (messages.length > 1) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="assistant">
      <Navigationbar />

      {/* Error Message */}
      {error && (
        <p className="text-center mt-5 text-danger">
          Sorry, AI Assistant is temporarily unavailable. Please try again later.
        </p>
      )}

      {/* Chat Interface */}
      {!error && connected && (
        <div className="container d-flex flex-column vh-100 border rounded bg-light">
          {/* Messages Container (Scrollable without visible scrollbar) */}
          <div className="flex-grow-1 overflow-hidden p-3 d-flex flex-column">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`mb-2 p-3 rounded w-75 ${
                  m.role === "AI" ? "bg-secondary text-black align-self-start" : "bg-dark text-white align-self-end"
                }`}
              >
                {m.message}
              </div>
            ))}
            {loading && (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status"></div>
                <span className="ms-2">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Fixed Input Box */}
          <div className="d-flex align-items-center border-top p-2 bg-white position-sticky bottom-0 w-100">
            <input
              type="text"
              className="form-control me-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={loading}
              onKeyDown={handleKeyPress}
            />
            <button className="btn btn-primary" onClick={sendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssistantPage;
