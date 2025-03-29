'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Here you would connect to your Gemini API
      // This is a placeholder for the actual API call
      const response = await fetch('/api/AIHandler/geminiHandler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputMessage }),
      });
      
      const data = await response.json();
      
      // Add assistant response
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || "I'm sorry, I couldn't process that request.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error communicating with Gemini API:', error);
      
      // Add error message
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, there was an error processing your request. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen flex bg-[#1a1a1a] text-white font-sans">
      {/* Sidebar - Responsive */}
      <div className="fixed left-0 sm:left-5 top-0 h-screen flex items-center z-40">
        <div className="w-[50px] sm:w-[60px] bg-[#2a2a2a]/80 backdrop-blur-xl text-white rounded-r-xl sm:rounded-xl shadow-xl border border-[#3a3a3a] h-[calc(100vh-40px)] sm:h-[calc(100vh-80px)] flex flex-col items-center py-4 sm:py-6">
          <div className="space-y-6 sm:space-y-8 flex flex-col items-center">
            <button 
              onClick={() => router.back()}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg hover:bg-[#3a3a3a] transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg hover:bg-[#3a3a3a] transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
            <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg hover:bg-[#3a3a3a] transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          
          {/* Profile Image - Added at the bottom */}
          <div className="mt-auto flex justify-center items-center w-full pb-4 sm:pb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 flex items-center justify-center overflow-hidden border-2 border-[#3a3a3a] hover:border-[#707070] transition-all duration-300 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content - Responsive */}
      <div className="flex-1 ml-[50px] sm:ml-[80px] p-2 sm:p-4 md:p-6 lg:p-8 flex items-center">
        <div className="bg-[#2a2a2a]/80 backdrop-blur-xl rounded-xl border border-[#3a3a3a] shadow-xl h-[calc(100vh-20px)] sm:h-[calc(100vh-40px)] md:h-[calc(100vh-60px)] lg:h-[calc(100vh-80px)] overflow-hidden w-full">
          <div className="p-3 sm:p-4 md:p-6">
            {/* Header - Responsive */}
            <div className="mb-4 sm:mb-6 md:mb-8 pt-2 sm:pt-3 md:pt-4 flex justify-between items-center">  
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">AI Assistant Chat</h2>
                <p className="text-gray-400 text-xs sm:text-sm">Chatea con tu asistente potenciado</p>
              </div>
              <div className="flex items-center space-x-2 bg-[#3a3a3a]/50 px-2 sm:px-3 py-1 rounded-full border border-[#4a4a4a]">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Gemini 2 Flash</span>
              </div>
            </div>

            {/* Chat Container - Responsive */}
            <div className="bg-[#3a3a3a]/30 backdrop-blur-sm rounded-lg border border-[#4a4a4a] hover:border-[#5a5a5a] transition-all duration-300 h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)] md:h-[calc(100vh-220px)] lg:h-[calc(100vh-240px)] flex flex-col overflow-hidden">
              {/* Messages Area - Responsive */}
              <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 md:space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-2 sm:px-4">
                    <div className="bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-3 sm:mb-4 flex items-center justify-center text-white text-xl sm:text-2xl shadow-lg">🤖</div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Asistente AI</h3>
                    <p className="text-slate-300 text-sm sm:text-base max-w-xs sm:max-w-sm md:max-w-md">Pregúntame cualquier cosa y te ayudaré con respuestas inteligentes potenciadas por Gemini.</p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-2 sm:p-3 md:p-4 ${
                          message.role === 'user' 
                            ? 'bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 text-white' 
                            : 'bg-[#3a3a3a]/50 border border-[#4a4a4a]'
                        }`}
                      >
                        <div className="flex items-center mb-1 sm:mb-2">
                          {message.role === 'assistant' && (
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-1 sm:mr-2 text-xs sm:text-sm">AI</div>
                          )}
                          <div className={`text-xs sm:text-sm ${message.role === 'user' ? 'ml-auto' : ''}`}>
                            {message.role === 'user' ? 'You' : 'Assistant'} • {formatTime(message.timestamp)}
                          </div>
                        </div>
                        <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#3a3a3a]/50 border border-[#4a4a4a] rounded-lg p-2 sm:p-3 md:p-4 max-w-[85%] sm:max-w-[80%]">
                      <div className="flex items-center mb-1 sm:mb-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-1 sm:mr-2 text-xs sm:text-sm">AI</div>
                        <div className="text-xs sm:text-sm">Assistant • {formatTime(new Date())}</div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
          </div>

              {/* Input Area - Responsive */}
              <div className="p-2 sm:p-3 md:p-4 border-t border-[#4a4a4a] w-full">
                <div className="relative w-full max-w-full">
                  
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full min-w-0 bg-[#3a3a3a]/50 border border-[#4a4a4a] rounded-lg px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 pr-10 sm:pr-12 md:pr-14"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className={`absolute right-1 top-1/2 transform -translate-y-1/2 flex-shrink-0 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 p-1.5 sm:p-2 rounded-lg ${
                      isLoading || !inputMessage.trim() 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:opacity-90'
                    } transition-all duration-300`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}