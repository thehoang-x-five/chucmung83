import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Music2, Volume2, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => console.log("Audio is ready to play!");
    const handleError = (e: any) => {
      console.error("Audio Load Error:", e);
      const error = audio.error;
      if (error) {
        console.error("Audio specific error:", {
          code: error.code,
          message: error.message,
        });
      }
    };

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        console.log("Pausing audio...");
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        console.log("Starting audio playback...");
        // Reset to start if it ended or wasn't loaded
        if (audioRef.current.readyState === 0) {
          audioRef.current.load();
        }
        
        audioRef.current.play()
          .then(() => {
            console.log("Playback started successfully!");
            setIsPlaying(true);
          })
          .catch((err) => {
            console.error("Audio playback blocked/failed:", err);
            // Auto-play might be blocked by browser or source missing
          });
      }
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <audio ref={audioRef} loop src="/nhac.mp3" />

      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg backdrop-blur-md border border-white/20 transition-all duration-500 ${isPlaying ? "bg-rose-400/80 text-white" : "bg-white/40 text-rose-500"
          }`}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <Volume2 className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <Music2 className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visualizer animation when playing */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
                className="absolute w-full h-full rounded-full border border-rose-400"
              />
            ))}
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
