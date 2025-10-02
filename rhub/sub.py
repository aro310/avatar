import subprocess
import os

working_directory = r"E:\reactav\aro\rhub"

mp3_file = os.path.abspath("../public/audios/output.mp3")
ogg_file = os.path.abspath("../public/audios/output.ogg")
json_file = os.path.abspath("../public/audios/aro.json")

# Conversion MP3 -> OGG Vorbis
print("🎵 Conversion en OGG Vorbis...")
subprocess.run(["ffmpeg", "-y", "-i", mp3_file, "-c:a", "libvorbis", ogg_file], check=True)

# Appel de Rhubarb
command = [
    "rhubarb.exe",
    "-f", "json",
    ogg_file,
    "-o", json_file
]

print(f"🎤 Fichier audio : {ogg_file}")
print(f"📄 JSON attendu : {json_file}")

try:
    result = subprocess.run(
        command,
        cwd=working_directory,
        check=True,
        capture_output=True,
        text=True
    )
    print("✅ Rhubarb terminé avec succès")
    print(result.stdout)
except subprocess.CalledProcessError as e:
    print("❌ Erreur Rhubarb :")
    print(e.stderr)
