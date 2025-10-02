from flask import Flask, request
import subprocess
import os

app = Flask(__name__)

@app.route("/")
def home():
    return """
    <html>
      <head><title>Lanceur</title></head>
      <body>
        <h1>Texte → Audio → JSON</h1>
        <form action="/run-script" method="post">
          <input type="text" name="texte" placeholder="Écris ton texte ici" size="50"/>
          <button type="submit">Générer</button>
        </form>
      </body>
    </html>
    """

@app.route("/run-script", methods=["POST"])
def run_script():
    # Récupérer le texte saisi
    texte = request.form.get("texte", "Texte par défaut")

    # 1. Lancer ele.py avec le texte
    ele = os.path.abspath("ele.py")
    subprocess.run(["python", ele, texte], check=True)

    # 2. Lancer sub.py (convertir MP3->OGG->JSON)
    sub = os.path.abspath("sub.py")
    subprocess.run(["python", sub], check=True)

    return f"✅ Audio et JSON générés avec succès pour le texte : {texte}"

if __name__ == "__main__":
    app.run(debug=True)
