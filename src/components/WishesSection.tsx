import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Heart, Sparkles } from "lucide-react";

const WishesSection = () => {
  const [gifted, setGifted] = useState(false);
  const [showRose, setShowRose] = useState(false);

  const fireConfetti = () => {
    if (gifted) return;
    setGifted(true);
    setShowRose(true);
    
    // Auto hide rose after 5 seconds
    setTimeout(() => {
      setShowRose(false);
    }, 5000);

    const colors = ["#d4918c", "#e6b4aa", "#c8aa78", "#f5d5cf", "#ffeaa7", "#ff9ff3"];
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
    "Gửi đến những bông hoa xinh đẹp nhất lớp mình — các bạn chính là màu sắc rực rỡ nhất khiến mỗi ngày đi học đều trở nên thật ý nghĩa và đầy niềm vui.",
    "Cảm ơn các cô gái vì sự hiện diện đáng yêu, vì những nụ cười tỏa nắng và sự đồng hành tuyệt vời. Lớp mình thật may mắn khi có các bạn!",
    "Chúc các bạn 8/3 thật ngọt ngào, luôn tự tin tỏa sáng rạng ngời và mãi là những 'nàng thơ' xinh đẹp nhất trong mắt bọn tớ nhé! 💐",
  ];

  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Sparkles className="w-8 h-8 text-rose-gold mx-auto mb-6 animate-sparkle" />

          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Lời chúc <span className="text-gradient-rose italic">yêu thương</span>
          </h2>

          <p className="font-body text-sm text-muted-foreground mb-12 tracking-wide">
            Gửi đến các bạn nữ trong lớp 💕
          </p>

          <div className="space-y-8 mb-16">
            {wishes.map((wish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
              >
                <div className="glass-card rounded-3xl p-8 md:p-10 text-left border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <p className="font-body text-foreground/80 text-lg md:text-xl leading-relaxed italic">
                    "{wish}"
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
          className="relative"
        >
          <AnimatePresence>
            {showRose && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, y: -120, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -180, transition: { duration: 1.5 } }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-20"
              >
                <div className="relative">
                  <img 
                    src="/rose_gift.png" 
                    alt="Rose Gift" 
                    className="w-48 md:w-64 h-auto drop-shadow-2xl"
                  />
                  <motion.div
                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-4 bg-rose-200/20 blur-3xl rounded-full -z-10"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
