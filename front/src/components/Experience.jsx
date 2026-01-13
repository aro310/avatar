import { Environment, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react"; // Added useState
import { Avatar } from "./Avatar";

export const Experience = () => {
  const viewport = useThree((state) => state.viewport);
  const videoRef = useRef();
  const [videoReady, setVideoReady] = useState(false); // New state to track readiness

  useEffect(() => {
    // Création de l’élément vidéo HTML
    const video = document.createElement("video");
    video.src = "/videos/ral.mp4"; // Added leading '/' for absolute path (adjust if needed)
    video.crossOrigin = "Anonymous";
    video.loop = true;
    video.muted = true;
    video.preload = "auto"; // Encourage preloading

    videoRef.current = video;

    const handleCanPlay = () => {
      video.play()
        .then(() => setVideoReady(true))
        .catch((err) => console.error("Video play error:", err));
    };

    video.addEventListener("canplay", handleCanPlay);

    video.load(); // Explicitly start loading

    // Cleanup
    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.pause();
    };
  }, []);

  return (
    <>
      <OrbitControls />
      <Avatar position={[0, -3, 5]} scale={2} />
      <Environment preset="sunset" />

      {/* Plan de fond avec la texture vidéo */}
      {videoReady && videoRef.current && (
        <mesh position={[0, 0, -5]}>
          <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
          <meshBasicMaterial>
            <videoTexture attach="map" args={[videoRef.current]} />
          </meshBasicMaterial>
        </mesh>
      )}
    </>
  );
};