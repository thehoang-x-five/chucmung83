import { useScroll, useTransform, motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import WishesSection from "@/components/WishesSection";
import MusicPlayer from "@/components/MusicPlayer";
import FloatingParticles from "@/components/FloatingParticles";

const Index = () => {
  const { scrollYProgress } = useScroll();
  
  // Smoothly interpolate background color from soft rose to a deeper elegant rose or gold
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    ["#fff5f5", "#fdf2f8", "#fff1f2", "#fdf4ff"]
  );

  return (
    <motion.main 
      style={{ backgroundColor }}
      className="overflow-x-hidden transition-colors duration-1000"
    >
      <MusicPlayer />
      <FloatingParticles />
      <HeroSection />
      <PhotoGallerySection />
      <WishesSection />
    </motion.main>
  );
};

export default Index;
