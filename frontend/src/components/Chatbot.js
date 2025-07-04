import React, { useState, useRef, useEffect } from 'react';
import '../css/Chatbot.css';
import FormattedMessage from './FormattedMessage';

// Use the same API pattern as other components for deployment consistency
const API_URL = process.env.REACT_APP_API_URI || "http://localhost:8080";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isConfigured, setIsConfigured] = useState(true);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Namaste! I'm your AI travel assistant specializing in Prayagraj (Allahabad) and Kumbh Mela. I'm here to help you with information about sacred sites, cultural experiences, travel tips, and everything about this holy city. How can I assist your spiritual journey today?",
            isBot: true,
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const exampleQuestions = [
        "What is the significance of Triveni Sangam in Prayagraj?",
        "When is the next Kumbh Mela and what should I know?",
        "What are the must-visit places in Prayagraj?",
        "How do I participate in sacred bathing at Kumbh Mela?",
        "What is the best time to visit Prayagraj?",
        "Tell me about Allahabad Fort and its history",
        "What local food should I try in Prayagraj?",
        "How to reach Prayagraj and what are accommodation options?"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Check chatbot configuration on component mount
    useEffect(() => {
        const checkConfig = async () => {
            try {
                const response = await fetch(`${API_URL}/api/chatbot/status`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setIsConfigured(data.status === 'ready');
                
                if (data.status !== 'ready') {
                    setMessages([{
                        id: 1,
                        text: "Hi! I'm your AI travel assistant, but I need to be configured first. Please ask the administrator to set up the Gemini API key.",
                        isBot: true,
                        timestamp: new Date(),
                        isError: true
                    }]);
                }
            } catch (error) {
                console.error('Failed to check chatbot status:', error);
                setIsConfigured(false);
                setMessages([{
                    id: 1,
                    text: "Hi! I'm your AI travel assistant, but I'm having trouble connecting to the server. Please try refreshing the page.",
                    isBot: true,
                    timestamp: new Date(),
                    isError: true
                }]);
            }
        };
        
        checkConfig();
    }, []);

    const clearChat = () => {
        setMessages([
            {
                id: 1,
                text: "Namaste! I'm your AI travel assistant specializing in Prayagraj (Allahabad) and Kumbh Mela. I'm here to help you with information about sacred sites, cultural experiences, travel tips, and everything about this holy city. How can I assist your spiritual journey today?",
                isBot: true,
                timestamp: new Date()
            }
        ]);
    };

    const sendMessage = async (message = null) => {
        const messageToSend = message || inputMessage.trim();
        
        if (!messageToSend) return;
        
        // Check if chatbot is configured
        if (!isConfigured) {
            const errorMessage = {
                id: Date.now() + 1,
                text: "The chatbot service is not properly configured. Please contact the administrator.",
                isBot: true,
                timestamp: new Date(),
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
            return;
        }

        // Add user message
        const userMessage = {
            id: Date.now(),
            text: messageToSend,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/chatbot/chat`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: messageToSend,
                    chatHistory: messages 
                }),
            });

            const data = await response.json();

            if (data.success) {
                const botMessage = {
                    id: Date.now() + 1,
                    text: data.response,
                    isBot: true,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botMessage]);
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
                isBot: true,
                timestamp: new Date(),
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
        
        // Auto-resize textarea
        const textarea = e.target;
        textarea.style.height = '44px';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <div className={`chatbot-toggle ${isOpen ? 'active' : ''}`} onClick={toggleChat}>
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <div className="chatbot-header-info">
                            <i className="fas fa-robot chatbot-icon"></i>
                            <div>
                                <h3>Prayagraj Travel Assistant</h3>
                                <span className="chatbot-status">
                                    {isConfigured ? 'Online' : 'Configuration Required'}
                                </span>
                            </div>
                        </div>
                        <div className="chatbot-header-actions">
                            <button className="chatbot-clear" onClick={clearChat} title="Clear chat">
                                <i className="fas fa-trash"></i>
                            </button>
                            <button className="chatbot-close" onClick={toggleChat}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`message ${message.isBot ? 'bot-message' : 'user-message'} ${message.isError ? 'error-message' : ''}`}
                            >
                                <div className="message-content">
                                    {message.isBot ? (
                                        <FormattedMessage text={message.text} />
                                    ) : (
                                        <p>{message.text}</p>
                                    )}
                                    <span className="message-time">{formatTime(message.timestamp)}</span>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="message bot-message">
                                <div className="message-content">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {messages.length === 1 && (
                            <div className="example-questions">
                                <p className="example-title">Try asking me:</p>
                                {exampleQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        className="example-question"
                                        onClick={() => sendMessage(question)}
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input">
                        <div className="input-container">
                            <textarea
                                value={inputMessage}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything about Prayagraj, Kumbh Mela, or travel..."
                                disabled={isLoading}
                                rows="1"
                                style={{ height: '44px' }}
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={!inputMessage.trim() || isLoading}
                                className="send-button"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
