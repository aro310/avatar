// src/services/apiService.js
const API_URL = 'http://127.0.0.1:5000/api/run-script';

export const generateAudioFromText = async (text) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texte: text }),
  };
  const response = await fetch(API_URL, requestOptions);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Une erreur est survenue.');
  }
  return response.json();
};