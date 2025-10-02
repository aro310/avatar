from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
from flasgger import Swagger # 1. Importer Swagger

app = Flask(__name__)
CORS(app)
swagger = Swagger(app) # 2. Initialiser Swagger avec votre app

@app.route("/api/run-script", methods=["POST"])
def run_script():
    """
    Exécute les scripts de traitement de texte vers audio et JSON.
    ---
    tags:
      - Script Execution
    parameters:
      - in: body
        name: body
        required: true
        schema:
          id: ScriptInput
          required:
            - texte
          properties:
            texte:
              type: string
              description: Le texte à convertir.
              example: "Bonjour, ceci est un test."
    responses:
      200:
        description: Les scripts ont été exécutés avec succès.
        schema:
          properties:
            status:
              type: string
              example: success
            message:
              type: string
              example: "Audio et JSON générés avec succès pour le texte : '...'"
      400:
        description: Requête invalide, le champ 'texte' est manquant.
      500:
        description: Erreur interne lors de l'exécution d'un script.
    """
    try:
        data = request.get_json()
        texte = data.get("texte")

        if not texte:
            return jsonify({"status": "error", "message": "Le texte est manquant"}), 400

        # ... (le reste de votre logique reste inchangé)
        ele_script_path = os.path.abspath("ele.py")
        subprocess.run(["python", ele_script_path, texte], check=True, capture_output=True, text=True)

        sub_script_path = os.path.abspath("sub.py")
        subprocess.run(["python", sub_script_path], check=True, capture_output=True, text=True)
        # ---

        return jsonify({
            "status": "success", 
            "message": f"Audio et JSON générés avec succès pour le texte : '{texte}'"
        })

    except subprocess.CalledProcessError as e:
        return jsonify({
            "status": "error", 
            "message": "Une erreur est survenue lors de l'exécution d'un script.",
            "details": e.stderr
        }), 500
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)