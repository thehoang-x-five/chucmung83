import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import floralFrame from "@/assets/floral-frame.png";

const getRotation = (i: number) => {
  const rotations = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 2.5];
  return rotations[i % rotations.length];
};

const PhotoCard = ({ photo, index }: { photo: string; index: number }) => {
  const { scrollYProgress } = useScroll();
  
  // Create unique parallax offsets for each card
  const yOffset = useTransform(
    scrollYProgress, 
    [0.1 * (index % 3), 0.8], 
    [0, (index % 2 === 0 ? -150 : 150) * (1 + (index % 3) * 0.2)]
  );
  
  const rotateOffset = useTransform(
    scrollYProgress,
    [0.2, 0.9],
    [getRotation(index), getRotation(index) + (index % 2 === 0 ? -15 : 15)]
  );

  return (
    <motion.div
      style={{ y: yOffset, rotateZ: rotateOffset }}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: (index % 3) * 0.1 }}
      whileHover={{
        y: -30,
        rotateZ: 0,
        scale: 1.15,
        zIndex: 20,
        transition: { duration: 0.4 },
      }}
      className="relative group cursor-pointer"
    >
      <div className="polaroid-frame transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(212,145,140,0.4)]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
          <img
            src={photo}
            alt={`Photo ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <img
            src={floralFrame}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-30"
            style={{ mixBlendMode: "multiply" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <p className="font-display text-center text-muted-foreground text-sm italic mt-4 mb-2">
          Xinh đẹp quá! ✨
        </p>
      </div>
    </motion.div>
  );
};

const PhotoGallerySection = () => {
  const photos = [
    "/468086319_507933815581374_4899758035036927254_n.jpg",
    "/472719386_537835405924548_6377769709378243733_n.jpg",
    "/472786647_538445932530162_3031159094901185603_n.jpg",
    "/476150049_558423247199097_2124128989130602572_n.jpg",
    "/481257145_577509278623827_5975134808063789406_n.jpg",
    "/637273783_853701694337916_2111723828751793581_n.jpg",
  ];

  const getGridClass = () => {
    const count = photos.length;
    if (count === 1) return "grid-cols-1 max-w-md mx-auto";
    if (count === 2) return "grid-cols-2 max-w-2xl mx-auto";
    if (count <= 4) return "grid-cols-2 md:grid-cols-2 max-w-3xl mx-auto";
    if (count <= 6) return "grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto";
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto";
  };

  return (
    <section id="photo-section" className="py-32 md:py-48 px-6 relative">
      <div className="max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-sm tracking-[0.3em] uppercase text-rose-400 mb-6 font-medium"
        >
          Gallery Của Chúng Mình
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-8"
        >
          Lưu giữ những <span className="text-gradient-rose italic">khoảnh khắc</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-muted-foreground mb-20 text-base max-w-2xl mx-auto italic"
        >
          "Mỗi nụ cười của các bạn là một bông hoa đẹp nhất trong vườn hoa của lớp mình" 🌸
        </motion.p>

        <div className={`grid gap-12 md:gap-16 ${getGridClass()}`}>
          {photos.map((photo, index) => (
            <PhotoCard key={photo} photo={photo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallerySection;
