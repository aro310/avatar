// src/App.jsx
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { TextToAudioGenerator } from "./components/TextToAudioGenerator"; // Importer le composant

function App() {
  return (
    // Ajouter un conteneur principal
    <div className="app-container">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
      {/* Ajouter l'interface utilisateur ici */}
      <TextToAudioGenerator />
    </div>
  );
}

export default App;