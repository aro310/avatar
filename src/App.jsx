import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { TextToAudioGenerator } from "./components/TextToAudioGenerator"; 
import { useState } from "react";
import "./App.css";

function App() {
  const [audioData, setAudioData] = useState(null); // État pour stocker l'audio et le lipsync
  const [playAudio, setPlayAudio] = useState(false); // Contrôle la lecture

  // Fonction pour recevoir les données de TextToAudioGenerator
  const handleAudioGenerated = (data) => {
    setAudioData(data); // Stocke les données générées
    setPlayAudio(true); // Déclenche la lecture
  };

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
          <color attach="background" args={["#ececec"]} />
          <Experience audioData={audioData} playAudio={playAudio} setPlayAudio={setPlayAudio} />
        </Canvas>
      </div>
      <div className="ui-container">
        <TextToAudioGenerator onAudioGenerated={handleAudioGenerated} />
      </div>
    </div>
  );
}

export default App;