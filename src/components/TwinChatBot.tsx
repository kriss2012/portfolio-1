import React, { useState, useRef, useEffect } from 'react';
import './TwinChatBot.css';
import { portfolioConfig } from '../config/portfolio.config';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

const TwinChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hi there! I'm Krishna's AI Twin. Feel free to ask me anything about his skills, projects, or background. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Dragging logic
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const chatRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.chat-header') && !(e.target as HTMLElement).closest('.chat-close')) {
      setIsDragging(true);
      dragStartPos.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
      document.body.style.userSelect = 'none';
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.userSelect = '';
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');
    
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Connect to the backend (uses VITE_BACKEND_URL in production, localhost in development)
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, session_id: 'portfolio_visitor' })
      });
      
      if (!res.ok) {
        throw new Error('Failed to reach backend');
      }
      
      const data = await res.json();
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || "I couldn't generate a response.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "I'm currently offline or unreachable. Please ensure the backend server (main.py) is running on port 8000.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="twin-chat-container">
      {isOpen && (
        <div 
          className="twin-chat-window" 
          ref={chatRef}
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="chat-header">
            <div className="chat-header-info">
              <img src={portfolioConfig.personal.avatar} alt="Krishna" className="chat-avatar" />
              <div className="chat-title-wrapper">
                <span className="chat-title">Krishna's AI Twin</span>
                <span className="chat-status">Online</span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>&times;</button>
          </div>
          
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-msg-wrapper ${msg.sender}`}>
                <div className={`chat-msg ${msg.sender} ${msg.isError ? 'error' : ''}`}>
                  {msg.text}
                </div>
                <span className="chat-time">{formatTime(msg.timestamp)}</span>
              </div>
            ))}
            
            {isTyping && (
              <div className="chat-msg-wrapper bot">
                <div className="chat-msg bot">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-area">
            <form className="chat-input-form" onSubmit={handleSend}>
              <input
                type="text"
                placeholder="Ask me something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
              />
              <button type="submit" disabled={!input.trim() || isTyping}>
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <div className="twin-chat-btn" onClick={() => setIsOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '30px', height: '30px' }}>
            <path d="M21 11.5A8.38 8.38 0 0 1 20.1 15.3A8.5 8.5 0 0 1 12.5 20A8.38 8.38 0 0 1 8.7 19.1L3 21L4.9 15.3A8.38 8.38 0 0 1 4 11.5A8.5 8.5 0 0 1 11.6 6.8A8.38 8.38 0 0 1 15.4 7.7H15.9A8.48 8.48 0 0 1 21 11.5Z" />
            <path d="M8 10V14" />
            <path d="M6 12H10" />
            <circle cx="16" cy="11" r="1" fill="currentColor" stroke="none" />
            <circle cx="14" cy="13" r="1" fill="currentColor" stroke="none" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default TwinChatBot;
