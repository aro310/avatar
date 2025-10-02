from elevenlabs.client import ElevenLabs
from elevenlabs import save
import os, sys

# Récupération du texte depuis les arguments
texte = sys.argv[1] if len(sys.argv) > 1 else "Texte par défaut"

# Dossier de sortie
output_dir = os.path.abspath("../public/audios")
os.makedirs(output_dir, exist_ok=True)

client = ElevenLabs(api_key="sk_b15828ef829138a668570cf2e049bbee8b474c79dbc5e8e6")

# Génération audio
audio = client.text_to_speech.convert(
    text=texte,
    voice_id="aQROLel5sQbj1vuIVi6B",
    model_id="eleven_multilingual_v2"
)

mp3_path = os.path.join(output_dir, "output.mp3")
save(audio, mp3_path)

print(f"✅ Audio généré depuis le texte : '{texte}' → {mp3_path}")
