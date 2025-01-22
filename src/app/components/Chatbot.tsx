'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/styles/components/chatbot.module.css';

// Function to sanitize input and output
const sanitize = (text: string) => {
  const element = document.createElement('div');
  element.innerText = text; // Set text to innerText to escape HTML
  return element.innerHTML; // Return the escaped HTML
};

// Function to convert Markdown to plain text
const convertToPlainText = (text: string) => {
  // This is a simple implementation; you can enhance it as needed
  return text.replace(/[*_~`]/g, ''); // Remove Markdown formatting characters
};

// Define interfaces for type safety
interface ChatMessage {
  user: string;
  bot: string;
}

interface ChatResponse {
  reply?: string;
  error?: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newMessageIndex = messages.length;
    setMessages(prev => [...prev, { user: userMessage, bot: '' }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
        credentials: 'same-origin'
      });

      const data = await response.json() as ChatResponse;

      if (!response.ok) {
        const errorMessage = data.error || 'An error occurred while processing your request';
        throw new Error(`${errorMessage} (${response.status})`);
      }

      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessageIndex < newMessages.length) {
          const messageToUpdate = newMessages[newMessageIndex];
          if (messageToUpdate) {
            messageToUpdate.bot = data.reply || 'No response received';
          }
        }
        return newMessages;
      });
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessageIndex < newMessages.length) {
          const messageToUpdate = newMessages[newMessageIndex];
          if (messageToUpdate) {
            messageToUpdate.bot = `Error: ${errorMessage}. Please try again later.`;
          }
        }
        return newMessages;
      });
    } finally {
      setLoading(false);
    }
  };

  // Add welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        user: '', 
        bot: 'Hello! I\'m your Orange Field University assistant. How can I help you today?' 
      }]);
    }
  }, [isOpen, messages.length]);

  return (
    <div>
      <div className={styles.chatbotBubble} onClick={() => setIsOpen(!isOpen)}>
        💬
      </div>
      {isOpen && (
        <div className={styles.chatbotContainer}>
          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div key={index} className={styles.message}>
                {msg.user && <div className={styles.userMessage}>{msg.user}</div>}
                {msg.bot && <div className={styles.botMessage}>{msg.bot}</div>}
              </div>
            ))}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me about college admissions..."
              className={styles.input}
            />
            <button 
              onClick={handleSend} 
              disabled={loading} 
              className={styles.sendButton}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 