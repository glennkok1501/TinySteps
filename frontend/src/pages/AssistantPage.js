import React, { useState, useEffect, useRef } from "react";
import AiModal from "../components/assistant/AiModal";
import Sidebar from "../components/navigation/Sidebar";
import { Icon } from "@mdi/react";
import { mdiSend, mdiCreation } from "@mdi/js";

const AssistantPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(false);
  const messagesEndRef = useRef(null);
  const [showRec, setShowRec] = useState(false)

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


  const sendMessage = (text) => {
    if (socket && text.trim()) {
      const userMessage = { message: text };
      setMessages((prev) => [...prev, { role: "user", message: text }]);

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

  const handleSubmit = () => {
    sendMessage(input);
  };

  const formatMessage = (message) => {
    // Split message into paragraphs
    const paragraphs = message.split('\n\n');
    
    return paragraphs.map((paragraph, idx) => {
      // Check if paragraph contains any kind of list items (numbered or bullet)
      if (paragraph.match(/^[\d*]+[\.\s]/m)) {
        // Split into list items by either number or asterisk at start of line
        const items = paragraph.split(/\n(?=[\d*]+[\.\s])/);
        return (
          <ul key={idx} className="formatted-list">
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>
                {formatInlineText(item.replace(/^[\d*]+[\.\s]\s*/, ''))}
              </li>
            ))}
          </ul>
        );
      }
      
      // Return formatted paragraph
      return <p key={idx}>{formatInlineText(paragraph)}</p>;
    });
  };

  const formatInlineText = (text) => {
    // Split the text into segments that need different formatting
    const segments = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    
    return segments.map((segment, idx) => {
      // Handle bold text
      if (segment.startsWith('**') && segment.endsWith('**')) {
        return <strong key={idx}>{segment.slice(2, -2)}</strong>;
      }
      
      // Handle links
      const linkMatch = segment.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return <a key={idx} href={linkMatch[2]} target="_blank" rel="noopener noreferrer">{linkMatch[1]}</a>;
      }
      
      // Regular text
      return segment;
    });
  };

  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content assistant-page">
        {error && (
          <div className="alert alert-danger text-center m-4" role="alert">
            Sorry, AI Assistant is temporarily unavailable. Please try again later.
          </div>
        )}

        {!error && connected && (
          <div className="chat-container">
            {/* Welcome Message */}
            <div className="hero-section">
                <div className="container text-center">
                    <h1 className="display-4 mb-3">AI Assistant</h1>
                    <p className="lead">Get personalized help finding the perfect preschool for your child</p>
                </div>
            </div>
            {/* Messages Area */}
            <div className="messages-container">
              {messages.map((m, index) => (
                <div
                  key={index}
                  className={`message ${m.role === "AI" ? "ai" : "user"}`}
                >
                  {m.role === "AI" && (
                    <div className="avatar">
                      <Icon path={mdiCreation} size={1} />
                    </div>
                  )}
                  <div className="message-content">
                    {m.role === "AI" ? formatMessage(m.message) : m.message}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="message ai">
                  <div className="avatar">
                    <Icon path={mdiCreation} size={1} />
                  </div>
                  <div className="message-content typing">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="chat-input-container">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <AiModal 
                  showModal={showRec}
                  setShowModal={setShowRec}
                  sendMessage={sendMessage}
                />
                <button 
                  className="btn btn-primary d-flex align-items-center"
                  onClick={handleSubmit}
                  disabled={loading || !input.trim()}
                >
                  <Icon path={mdiSend} size={1} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AssistantPage;
