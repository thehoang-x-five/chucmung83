import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Heart, Sparkles } from "lucide-react";

const WishesSection = () => {
  const [gifted, setGifted] = useState(false);

  const fireConfetti = () => {
    if (gifted) return;
    setGifted(true);

    // Left side
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.2, y: 0.6 },
      colors: ["#d4918c", "#e6b4aa", "#c8aa78", "#f5d5cf", "#ffeaa7"],
    });
    // Right side
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.8, y: 0.6 },
      colors: ["#d4918c", "#e6b4aa", "#c8aa78", "#f5d5cf", "#ffeaa7"],
    });

    // Delayed burst
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { x: 0.5, y: 0.4 },
        colors: ["#d4918c", "#e6b4aa", "#c8aa78", "#f5d5cf"],
      });
    }, 400);
  };

  return (
    <section className="py-24 md:py-32 px-6 bg-secondary/30">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Sparkles className="w-8 h-8 text-rose-gold mx-auto mb-6 animate-sparkle" />

          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-8">
            Lời chúc <span className="text-gradient-rose italic">yêu thương</span>
          </h2>

          <div className="glass-card rounded-2xl p-8 md:p-12 mb-12">
            <p className="font-body text-foreground/80 text-base md:text-lg leading-relaxed mb-6">
              Gửi đến những người phụ nữ tuyệt vời nhất — những người luôn mạnh mẽ, dịu dàng
              và tỏa sáng mỗi ngày. Các bạn xứng đáng được yêu thương và trân trọng không chỉ 
              trong ngày hôm nay, mà là mỗi ngày trong cuộc sống.
            </p>
            <p className="font-body text-foreground/80 text-base md:text-lg leading-relaxed mb-6">
              Chúc các bạn luôn vui tươi, hạnh phúc, thành công và xinh đẹp. 
              Hãy luôn tự tin vì các bạn chính là điều kỳ diệu nhất! 🌸
            </p>
            <p className="font-display text-xl md:text-2xl text-gradient-rose italic">
              "Phụ nữ — bạn là bài thơ đẹp nhất mà cuộc đời viết nên"
            </p>
          </div>
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
                Yêu thương gửi đến bạn!
              </>
            ) : (
              <>
                <Gift className="w-5 h-5" />
                Nhận quà 🎁
              </>
            )}
          </button>
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
            Made with <Heart className="w-3 h-3 inline text-primary fill-primary" /> for Women's Day 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WishesSection;
