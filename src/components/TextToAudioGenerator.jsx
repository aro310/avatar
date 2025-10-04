import React, { useState } from 'react';
import { generateAudioFromText, chatWithGemini } from '../services/apiService'; // Ajout de chatWithGemini

export const TextToAudioGenerator = () => {
  const [inputPrompt, setInputPrompt] = useState(''); // Changé en inputPrompt pour clarifier
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Étape 1: Appel au chat Gemini avec le prompt
      const geminiResponse = await chatWithGemini(inputPrompt);
      
      // Étape 2: Utiliser la réponse de Gemini comme texte pour générer l'audio
      const result = await generateAudioFromText(geminiResponse);
      
      setMessage(result.message);
      window.dispatchEvent(new Event('audioGenerated')); // Déclenche la lecture comme avant
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ui-container">
      <h2>Chat avec Gemini et Générer l'audio</h2> {/* Légère mise à jour du titre pour refléter le changement */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Posez votre question à Gemini..." // Changé en prompt pour Gemini
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Génération...' : 'Envoyer et Générer'}
        </button>
      </form>
      {message && <p className="response-message">{message}</p>}
    </div>
  );
};