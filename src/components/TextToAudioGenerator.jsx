import React, { useState } from 'react';
import { generateAudioFromText } from '../services/apiService';
export const TextToAudioGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const result = await generateAudioFromText(inputText);
      setMessage(result.message);
      window.dispatchEvent(new Event('audioGenerated'));
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="ui-container">
      <h2>Générer l'audio</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Écrivez votre texte ici..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Génération...' : 'Générer'}
        </button>
      </form>
      {message && <p className="response-message">{message}</p>}
    </div>
  );
};