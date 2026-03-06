import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload } from "lucide-react";
import floralFrame from "@/assets/floral-frame.png";

const PhotoUploadSection = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotos((prev) => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  // Dynamic grid layout based on photo count
  const getGridClass = () => {
    const count = photos.length;
    if (count === 1) return "grid-cols-1 max-w-md mx-auto";
    if (count === 2) return "grid-cols-2 max-w-2xl mx-auto";
    if (count <= 4) return "grid-cols-2 md:grid-cols-2 max-w-3xl mx-auto";
    if (count <= 6) return "grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto";
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-5xl mx-auto";
  };

  // Stagger rotation for visual interest
  const getRotation = (i: number) => {
    const rotations = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 2.5];
    return rotations[i % rotations.length];
  };

  return (
    <section id="photo-section" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-sm tracking-[0.25em] uppercase text-muted-foreground mb-4"
        >
          Khoảnh khắc của các bạn
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-4"
        >
          Những nụ cười <span className="text-gradient-rose italic">rạng rỡ</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-muted-foreground mb-12 text-sm"
        >
          Những khoảnh khắc đáng nhớ của các bạn nữ trong lớp 💐
        </motion.p>

        {/* Photo Gallery */}
        {photos.length > 0 && (
          <div className={`grid gap-6 md:gap-8 mb-8 ${getGridClass()}`}>
            <AnimatePresence mode="popLayout">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.slice(-20) + index}
                  initial={{ opacity: 0, scale: 0.7, rotateZ: getRotation(index) * 2 }}
                  whileInView={{ opacity: 1, scale: 1, rotateZ: getRotation(index) }}
                  viewport={{ once: true, margin: "-50px" }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 150, damping: 18, delay: index * 0.1 }}
                  whileHover={{
                    y: -12,
                    rotateZ: 0,
                    scale: 1.05,
                    zIndex: 10,
                    transition: { duration: 0.3 },
                  }}
                  className="relative group"
                >
                  <div className="polaroid-frame">
                    <div className="relative aspect-square overflow-hidden rounded-sm">
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <img
                        src={floralFrame}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40"
                        style={{ mixBlendMode: "multiply" }}
                      />
                    </div>
                    <p className="font-display text-center text-muted-foreground text-xs italic mt-2">
                      Xinh đẹp quá! ✨
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Upload area - only visible to uploader, hidden minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer inline-flex items-center gap-2 font-body text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300 mt-4"
        >
          <Upload className="w-3 h-3" />
          <span>{photos.length === 0 ? "Tải ảnh lên" : "Thêm ảnh"}</span>
        </motion.div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </section>
  );
};

export default PhotoUploadSection;
