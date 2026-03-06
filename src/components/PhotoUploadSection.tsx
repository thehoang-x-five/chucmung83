import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Upload, Camera } from "lucide-react";
import floralFrame from "@/assets/floral-frame.png";

const PhotoUploadSection = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set(e.clientX - rect.left - rect.width / 2);
      y.set(e.clientY - rect.top - rect.height / 2);
    },
    [x, y]
  );

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="photo-section" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-sm tracking-[0.25em] uppercase text-muted-foreground mb-4"
        >
          Khoảnh khắc của bạn
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-12"
        >
          Nụ cười <span className="text-gradient-rose italic">rạng rỡ</span> nhất
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-md mx-auto"
          style={{ perspective: 1000 }}
        >
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="relative"
          >
            {/* Floral frame overlay */}
            <div className="relative polaroid-frame mx-auto">
              {photo ? (
                <div className="relative aspect-square overflow-hidden rounded-sm">
                  <img
                    src={photo}
                    alt="Your beautiful photo"
                    className="w-full h-full object-cover"
                  />
                  {/* Floral frame overlay */}
                  <img
                    src={floralFrame}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    style={{ mixBlendMode: "multiply", opacity: 0.7 }}
                  />
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square bg-secondary/50 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:bg-secondary transition-colors duration-300 group"
                >
                  <div className="w-20 h-20 rounded-full bg-soft-pink/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-body text-muted-foreground text-sm">
                    Bấm để chọn ảnh
                  </p>
                </div>
              )}

              {/* Polaroid caption */}
              <p className="font-display text-center text-muted-foreground text-sm italic mt-3">
                {photo ? "Bạn thật xinh đẹp! 💐" : "Tải lên bức ảnh rạng rỡ nhất"}
              </p>
            </div>

            {photo && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => fileInputRef.current?.click()}
                className="mt-6 font-body text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Chọn ảnh khác
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        {!photo && (
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            onClick={() => fileInputRef.current?.click()}
            className="mt-8 inline-flex items-center gap-2 gradient-rose-gold text-primary-foreground font-body text-sm tracking-wider px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Upload className="w-4 h-4" />
            Tải ảnh lên
          </motion.button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </section>
  );
};

export default PhotoUploadSection;
