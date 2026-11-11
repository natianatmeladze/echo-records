import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Button from "./Button";

const FeaturedArtist = () => {
  const [artistImage, setArtistImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await axios.get("https://itunes.apple.com/search", {
          params: {
            term: "Queen A Night at the Opera",
            entity: "album",
            limit: 1,
          },
        });
        if (response.data.results[0]) {
          const highResCover = response.data.results[0].artworkUrl100.replace(
            "100x100bb",
            "600x600bb"
          );
          setArtistImage(highResCover);
        }
      } catch (error) {
        console.error("Error fetching Queen artist data:", error);
      }
    };

    fetchArtistData();
  }, []);

  return (
    <section className="w-full cursor-pointer px-6 lg:px-16 py-8 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
          {artistImage ? (
            <img
              src={artistImage}
              alt="Featured Artist Queen"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
            />
          ) : (
            <div className="w-full h-full bg-zinc-900 animate-pulse" />
          )}
        </div>

        <div className="flex flex-col items-start gap-4 flex-1">
          <span className="text-2xl font-bold tracking-widest text-white uppercase">
            FEATURED ARTIST: QUEEN
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            The Champions of Rock & Roll
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
            One of the most iconic rock bands in history. From the groundbreaking harmonies of "Bohemian Rhapsody" to theatrical stadium anthems, explore Queen's timeless vinyl discography pressed for true analog sound.
          </p>
          <div className="pt-2">
            <Button
              text="Read More"
              bg="bg-white hover:bg-zinc-200"
              textColor="text-black text-xs font-semibold uppercase tracking-wider"
              onClick={() => navigate("/artists")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtist;