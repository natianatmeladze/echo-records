import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Disc3, Headphones, PackageCheck } from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white py-12 px-6 lg:px-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-b border-zinc-800 pb-8 flex flex-col gap-3"
        >
          <span className="text-xs font-bold tracking-widest text-[#8B0000] uppercase">
            OUR STORY
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-tight">
            ABOUT ECHO RECORDS
          </h1>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
        >
          <h2 className="text-xl sm:text-2xl font-light text-zinc-200 leading-relaxed">
            Born from a passion for pure analog sound, Echo Records curates timeless vinyl pressings for listeners who treat music as a ritual.
          </h2>

          <div className="flex flex-col gap-4 text-zinc-400 text-sm leading-relaxed">
            <p>
              In an era of compressed digital streams, we believe nothing compares to dropping the needle on heavyweight 180g vinyl. Every record in our catalog is hand-selected for its mastering quality, sonic warmth, and iconic sleeve art.
            </p>
            <p>
              Whether you are building your first turntable setup or hunting for rare jazz, rock, and electronic pressings, our mission is to deliver records pressed with care and shipped with sleeves intact.
            </p>
          </div>
        </motion.section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-zinc-900 pt-12">
          <div className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/80 flex flex-col gap-3">
            <Disc3 className="w-5 h-5 text-[#8B0000]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Analog First
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Authentic pressings sourced from trusted labels and remastered from original tapes.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/80 flex flex-col gap-3">
            <Headphones className="w-5 h-5 text-[#8B0000]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Curated Selection
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No filler—only essential albums across Rock, Jazz, Soul, Hip-Hop, and Electronic.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/80 flex flex-col gap-3">
            <PackageCheck className="w-5 h-5 text-[#8B0000]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Collector Care
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Shipped in custom reinforced mailers with anti-static sleeves to prevent seam splits.
            </p>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800">
          <div>
            <h3 className="text-lg font-medium text-white">
              Ready to spin something new?
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Browse our latest arrivals and preview tracks before you buy.
            </p>
          </div>

          <Link
            to="/shop"
            className="px-6 py-3 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    </main>
  );
};

export default About;