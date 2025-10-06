# app/gemini_api.py

import google.generativeai as genai

# Configurez votre clé API
GOOGLE_API_KEY = "AIzaSyC15PyLpKjHZPRPmqdxS2LYzbZKYQPQWIE"
genai.configure(api_key=GOOGLE_API_KEY)

# Initialisez le modèle
model = genai.GenerativeModel('gemma-3-27b-it')  # Ajuste selon ton besoin

def chat_with_gemini(prompt):
    try:
        # Ajout d'instruction pour concision
        concise_prompt = f"{prompt}\n\nRéponds de manière concise, en 1-3 phrases maximum, sans détails inutiles. Tu t'appelles Aro, un assistant qui se spécialise sur le football"
        
        # Génération avec limitation de tokens
        generation_config = genai.types.GenerationConfig(
            max_output_tokens=100  # Limite à ~50-100 mots max
        )
        
        response = model.generate_content(concise_prompt, generation_config=generation_config)
        return response.text
    except Exception as e:
        return f"Erreur: {e}"
