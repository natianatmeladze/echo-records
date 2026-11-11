import React from "react";
import { Link } from "react-router";

const genres = [
  { name: "Rock", count: "120+ Albums" },
  { name: "Jazz", count: "85+ Albums" },
  { name: "Electronic", count: "60+ Albums" },
  { name: "Hip-Hop", count: "90+ Albums" },
  { name: "Soul", count: "45+ Albums" },
  { name: "Folk", count: "30+ Albums" },
  { name: "Ambient", count: "25+ Albums" },
  { name: "Classical", count: "40+ Albums" },
];

const BrowseGenres = () => {
  return (
    <section className="w-full px-6 lg:px-16 py-12 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="border-b border-zinc-800 pb-4">
          <h2 className="text-xl md:text-2xl font-bold tracking-wider uppercase text-white">
            BROWSE GENRES
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <Link
              key={genre.name}
              to={`/shop?genre=${genre.name.toLowerCase()}`}
              className="group relative h-28 bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between hover:border-zinc-600 hover:bg-zinc-800/40 transition-all duration-300"
            >
              <span className="text-white font-semibold text-base tracking-wide group-hover:text-[#8B0000] transition-colors">
                {genre.name}
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                {genre.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseGenres;