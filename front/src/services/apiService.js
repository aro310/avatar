// src/services/apiService.js
const API_URL_SCRIPT = 'http://127.0.0.1:5000/api/run-script';
const API_URL_CHAT = 'http://127.0.0.1:5000/api/chat';

export const generateAudioFromText = async (text) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texte: text }),
  };
  const response = await fetch(API_URL_SCRIPT, requestOptions);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Une erreur est survenue.');
  }
  return response.json();
};

export const chatWithGemini = async (prompt) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: prompt }),
  };
  const response = await fetch(API_URL_CHAT, requestOptions);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur lors du chat avec Gemini.');
  }
  const data = await response.json();
  return data.response; // Retourne uniquement la réponse de Gemini
};