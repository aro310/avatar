import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateAudioFromText, chatWithGemini } from '../services/apiService';
import { levaStore as store } from 'leva';
import "./bot.css";

export const TextToAudioGenerator = () => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputPrompt.trim()) return;

    const newMessages = [...messages, { role: 'user', content: inputPrompt }];
    setMessages(newMessages);
    setInputPrompt('');
    setIsLoading(true);
    store.set({ playAudio: false });
    store.set({ isGenerating: true });

    try {
      const geminiResponse = await chatWithGemini(newMessages);
      const result = await generateAudioFromText(geminiResponse);

      setMessages([...newMessages, { role: 'assistant', content: geminiResponse }]);
      window.dispatchEvent(new Event('audioGenerated'));
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: `Erreur : ${error.message}` }]);
    } finally {
      setIsLoading(false);
      store.set({ isGenerating: false });
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <>
      <div className="chat-container">
        <motion.h2 
          className="chat-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Aro GPT
        </motion.h2>

        <div 
          className="chat-history" 
          ref={chatRef}
          style={{ 
            maxHeight: '400px', 
            overflowY: 'auto', 
            width: '100%', 
            boxSizing: 'border-box',
            wordBreak: 'break-word' 
          }}
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`chat-bubble ${msg.role === 'user' ? 'user' : 'assistant'}`}
              initial={{ opacity: 0, x: msg.role === 'user' ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              style={{ wordBreak: 'break-word' }}
            >
              {msg.content}
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              className="chat-bubble assistant loading"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              style={{ wordBreak: 'break-word' }}
            >
              <span className="loading-dots">
                <span>.</span><span>.</span><span>.</span>
              </span>
            </motion.div>
          )}
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          <motion.input
            className="chat-input"
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Posez votre question ici..."
            disabled={isLoading}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          />
          <motion.button
            type="submit"
            className="chat-button"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <span className="loading-dots">
                <span>.</span><span>.</span><span>.</span>
              </span>
            ) : (
              'Envoyer'
            )}
          </motion.button>
        </form>
      </div>
    </>
  );
};