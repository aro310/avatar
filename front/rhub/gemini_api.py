# app/gemini_api.py

import google.generativeai as genai

# ✅ Clé API visible (OK pour usage local uniquement)
GOOGLE_API_KEY = "AIzaSyC15PyLpKjHZPRPmqdxS2LYzbZKYQPQWIE"

# Configuration de l'API
genai.configure(api_key=GOOGLE_API_KEY)

# Initialisation du modèle
MODEL_NAME = "gemma-3-27b-it"

try:
    model = genai.GenerativeModel(MODEL_NAME)
    print(f"✅ Modèle Gemini initialisé ({MODEL_NAME})")
except Exception as e:
    print(f"⚠️ Erreur d’initialisation du modèle Gemini : {e}")
    model = None

# 🧠 Mémoire courte de conversation (stockée côté serveur)
conversation_history = []


def chat_with_gemini(prompt: str) -> str:
    """
    Conversation continue avec le modèle Gemini.
    Maintient un contexte de discussion en mémoire courte.
    Évite les salutations inutiles et les répétitions.
    """
    if not model:
        return "Erreur : modèle non initialisé (vérifie ta clé API ou ta connexion Internet)."

    try:
        # Ajoute le nouveau message de l'utilisateur à l'historique
        conversation_history.append({"role": "user", "content": prompt})

        # Construit le contexte à envoyer au modèle
        context = "\n".join(
            [f"{msg['role'].capitalize()}: {msg['content']}" for msg in conversation_history[-5:]]
        )

        # Ajout d’instructions claires au modèle
        system_instructions = (
            "Tu es Aro, un assistant spécialisé dans le football. "
            "Réponds de manière naturelle, fluide, sans saluer ni te présenter à chaque message. "
            "Sois cohérent avec les messages précédents. "
            "Réponds en 1 à 4 phrases maximum. "
            "N’inclus pas de 'Bonjour' ou 'Salut' sauf si l'utilisateur le dit explicitement."
        )

        # Combine instructions et conversation
        full_prompt = f"{system_instructions}\n\nHistorique récent :\n{context}\n\nAro:"

        # Configuration de génération
        generation_config = genai.types.GenerationConfig(
            max_output_tokens=180,
            temperature=0.8,
            top_p=0.9,
            top_k=40,
        )

        # Génération du texte
        response = model.generate_content(full_prompt, generation_config=generation_config)

        # Vérification de la sortie
        if not response or not getattr(response, "text", None):
            return "⚠️ Aucune réponse générée par Gemini."

        reply = response.text.strip()

        # Ajoute la réponse du modèle à la mémoire
        conversation_history.append({"role": "assistant", "content": reply})

        return reply

    except Exception as e:
        print("💥 Erreur lors de la génération Gemini :", str(e))
        return f"Erreur interne : {str(e)}"
