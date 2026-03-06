import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 gradient-hero opacity-60" />

      <FloatingParticles />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6"
        >
          Ngày Quốc tế Phụ nữ
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight mb-6"
        >
          <span className="text-gradient-rose">Happy</span>
          <br />
          <span className="text-foreground">Women's Day</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="inline-block"
        >
          <span className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-gradient-rose italic">
            8/3
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-body text-muted-foreground text-base md:text-lg mt-8 max-w-lg mx-auto font-light"
        >
          Gửi tặng những đóa hồng yêu thương đến những người phụ nữ tuyệt vời nhất
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10"
        >
          <button
            onClick={() => {
              document.getElementById("photo-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="gradient-rose-gold text-primary-foreground font-body text-sm tracking-wider uppercase px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Khám phá ngay ✨
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
