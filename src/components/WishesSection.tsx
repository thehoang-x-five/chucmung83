import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Heart, Sparkles, Volume2, VolumeX } from "lucide-react";

// Free lofi music from a public CDN
const MUSIC_URL = "https://cdn.pixabay.com/audio/2024/11/01/audio_38fce20964.mp3";

const WishesSection = () => {
  const [gifted, setGifted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicPlaying(!musicPlaying);
  };

  const fireConfetti = () => {
    if (gifted) return;
    setGifted(true);

    // Auto-play music on gift
    if (!musicPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setMusicPlaying(true);
    }

    const colors = ["#d4918c", "#e6b4aa", "#c8aa78", "#f5d5cf", "#ffeaa7", "#ff9ff3"];

    // Multi-burst confetti
    const fire = (opts: confetti.Options) => confetti({ ...opts, colors });
    
    fire({ particleCount: 80, spread: 70, origin: { x: 0.15, y: 0.6 } });
    fire({ particleCount: 80, spread: 70, origin: { x: 0.85, y: 0.6 } });

    setTimeout(() => {
      fire({ particleCount: 100, spread: 100, origin: { x: 0.5, y: 0.35 } });
    }, 300);

    setTimeout(() => {
      fire({ particleCount: 60, spread: 120, origin: { x: 0.3, y: 0.5 }, startVelocity: 45 });
      fire({ particleCount: 60, spread: 120, origin: { x: 0.7, y: 0.5 }, startVelocity: 45 });
    }, 600);

    // Hearts burst
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x: 0.5, y: 0.5 },
        shapes: ["circle"],
        colors: ["#ff6b6b", "#ff9ff3", "#d4918c"],
        scalar: 1.5,
      });
    }, 900);
  };

  const wishes = [
    "Gửi đến các bạn nữ trong lớp — những người luôn mang đến tiếng cười, sự ấm áp và năng lượng tích cực cho mỗi ngày đến trường.",
    "Cảm ơn các bạn vì đã luôn là những người bạn đồng hành tuyệt vời, mạnh mẽ và đầy cảm hứng. Lớp mình sẽ không thể vui và ý nghĩa nếu thiếu các bạn!",
    "Chúc các bạn ngày 8/3 thật nhiều niềm vui, hạnh phúc, luôn tỏa sáng và xinh đẹp. Hãy luôn tự tin vì các bạn xứng đáng được yêu thương nhất! 🌸",
  ];

  return (
    <section className="relative py-24 md:py-32 px-6 bg-secondary/30">
      {/* Music toggle button - fixed */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label={musicPlaying ? "Tắt nhạc" : "Bật nhạc"}
      >
        {musicPlaying ? (
          <Volume2 className="w-5 h-5 text-primary animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Sparkles className="w-8 h-8 text-rose-gold mx-auto mb-6 animate-sparkle" />

          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Lời chúc <span className="text-gradient-rose italic">yêu thương</span>
          </h2>

          <p className="font-body text-sm text-muted-foreground mb-10 tracking-wide">
            Gửi đến các bạn nữ trong lớp 💕
          </p>

          <div className="space-y-6 mb-12">
            {wishes.map((wish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
              >
                <div className="glass-card rounded-2xl p-6 md:p-8 text-left">
                  <p className="font-body text-foreground/80 text-base md:text-lg leading-relaxed">
                    {wish}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="glass-card rounded-2xl p-8 mb-12">
              <p className="font-display text-xl md:text-2xl text-gradient-rose italic leading-relaxed">
                "Phụ nữ — các bạn là bài thơ đẹp nhất mà cuộc đời viết nên"
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <button
            onClick={fireConfetti}
            disabled={gifted}
            className={`inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-10 py-4 rounded-full shadow-lg transition-all duration-500 ${
              gifted
                ? "bg-soft-pink text-primary scale-105"
                : "gradient-rose-gold text-primary-foreground hover:shadow-xl hover:scale-105"
            }`}
          >
            {gifted ? (
              <>
                <Heart className="w-5 h-5 fill-current" />
                Yêu thương gửi đến các bạn!
              </>
            ) : (
              <>
                <Gift className="w-5 h-5" />
                Nhận quà 🎁
              </>
            )}
          </button>

          {gifted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 font-body text-sm text-muted-foreground"
            >
              🎵 Bật nhạc để tận hưởng khoảnh khắc đặc biệt nhé!
            </motion.p>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-8 border-t border-border"
        >
          <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
            Made with <Heart className="w-3 h-3 inline text-primary fill-primary" /> for the amazing girls in our class
          </p>
          <p className="font-body text-xs text-muted-foreground mt-2">
            Happy Women's Day 2026 🌸
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WishesSection;
