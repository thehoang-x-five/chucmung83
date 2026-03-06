import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, X, Plus } from "lucide-react";
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
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
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
          Tải lên những bức ảnh xinh đẹp nhất của các bạn nữ trong lớp 💐
        </motion.p>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <AnimatePresence mode="popLayout">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.slice(-20) + index}
                initial={{ opacity: 0, scale: 0.8, rotateZ: -5 }}
                animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotateZ: 10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                whileHover={{ y: -8, rotateZ: Math.random() > 0.5 ? 2 : -2 }}
                className="relative group"
              >
                <div className="polaroid-frame">
                  <div className="relative aspect-square overflow-hidden rounded-sm">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Floral frame overlay */}
                    <img
                      src={floralFrame}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                  <p className="font-display text-center text-muted-foreground text-xs italic mt-2">
                    Xinh đẹp quá! ✨
                  </p>

                  {/* Remove button */}
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="w-3 h-3 text-background" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add more photos card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer group"
          >
            <div className="polaroid-frame h-full">
              <div className="aspect-square bg-secondary/50 rounded-sm flex flex-col items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                {photos.length === 0 ? (
                  <>
                    <div className="w-16 h-16 rounded-full bg-soft-pink/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Camera className="w-7 h-7 text-primary" />
                    </div>
                    <p className="font-body text-muted-foreground text-xs px-2">
                      Bấm để chọn ảnh
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-soft-pink/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <Plus className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-body text-muted-foreground text-xs">
                      Thêm ảnh
                    </p>
                  </>
                )}
              </div>
              <p className="font-display text-center text-muted-foreground text-xs italic mt-2">
                {photos.length === 0 ? "Tải ảnh lên đây" : `${photos.length} ảnh`}
              </p>
            </div>
          </motion.div>
        </div>

        {photos.length === 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 gradient-rose-gold text-primary-foreground font-body text-sm tracking-wider px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Upload className="w-4 h-4" />
            Tải ảnh lên
          </motion.button>
        )}

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
