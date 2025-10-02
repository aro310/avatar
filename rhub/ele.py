from elevenlabs.client import ElevenLabs
from elevenlabs import save
import os, sys

# Récupération du texte depuis les arguments
texte = sys.argv[1] if len(sys.argv) > 1 else "Texte par défaut"

# Dossier de sortie
output_dir = os.path.abspath("../public/audios")
os.makedirs(output_dir, exist_ok=True)

client = ElevenLabs(api_key="sk_6ac41ace41d5569923b6cd1e2f48461cdc146299e585b922")

# Génération audio
audio = client.text_to_speech.convert(
    text=texte,
    voice_id="pNInz6obpgDQGcFmaJgB",
    model_id="eleven_multilingual_v2"
)

mp3_path = os.path.join(output_dir, "aro.mp3")
save(audio, mp3_path)

print(f" Audio généré depuis le texte : '{texte}' -> {mp3_path}")
