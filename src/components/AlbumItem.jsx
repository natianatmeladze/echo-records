import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import { useCart } from "../context/CartContext";
import { Music, Disc3 } from "lucide-react";

const AlbumItem = ({ album }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (audioRef.current && album.previewUrl) {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col cursor-pointer justify-between p-4 rounded-xl transition-all duration-300 relative"
    >
      {album.previewUrl && (
        <audio ref={audioRef} src={album.previewUrl} preload="none" />
      )}

      <AnimatePresence>
        {isPlaying && (
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-xl">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                rotate: { repeat: Infinity, duration: 3, ease: "linear" },
                scale: { duration: 0.2 },
              }}
              className="absolute top-3 right-3 text-[#8B0000] bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-[#8B0000]/40"
            >
              <Disc3 className="w-5 h-5 animate-spin" />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0, x: 0 }}
              animate={{
                y: [-10, -50],
                x: [0, 15, -10],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute bottom-16 right-8 text-[#8B0000]"
            >
              <Music className="w-5 h-5 drop-shadow-[0_0_8px_rgba(139,0,0,0.8)]" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3">
        <div className="relative aspect-square w-full rounded-lg overflow-hidden group/cover">
          <img
            src={album.cover}
            alt={album.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
            <button
              onClick={() => navigate(`/album/${album.id}`, { state: { album } })}
              className="px-4 py-2 bg-white/10 backdrop-blur-md text-white cursor-pointer text-xs font-medium rounded-full border border-white/20 hover:bg-white hover:text-black transition-all"
            >
              See Details
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-white text-sm tracking-normal group-hover:text-[#8B0000] transition-colors truncate">
              {album.title}
            </h3>
            <span className="text-zinc-400 font-medium text-xs">
              {album.price}
            </span>
          </div>
          <p className="text-zinc-400 text-xs font-normal truncate">
            {album.artist}
          </p>
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <Button
          text="Add to Cart"
          bg="bg-zinc-900"
          textColor="text-white text-xs py-2"
          onClick={() => addToCart(album)}
        />
      </div>
    </div>
  );
};

export default AlbumItem;