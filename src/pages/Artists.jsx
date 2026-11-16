import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";
import { Disc3 } from "lucide-react";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);

        const query = searchTerm.trim() ? searchTerm.trim() : "rock jazz soul legends";

        const response = await axios.get("https://itunes.apple.com/search", {
          params: {
            term: query,
            entity: "song",
            limit: 100,
          },
        });

        const uniqueArtistsMap = new Map();

        response.data.results.forEach((item) => {
          if (item.artistId && !uniqueArtistsMap.has(item.artistId)) {
            const releaseYear = item.releaseDate
              ? new Date(item.releaseDate).getFullYear()
              : "classic era";

            uniqueArtistsMap.set(item.artistId, {
              id: item.artistId,
              name: item.artistName,
              genre: item.primaryGenreName || "Music",
              image: item.artworkUrl100
                ? item.artworkUrl100.replace("100x100bb", "600x600bb")
                : "",
              previewUrl: item.previewUrl || null,
              featuredTrack: item.trackName,
              featuredAlbum: item.collectionName,
              country: item.country || "USA",
              story: `${item.artistName} is a renowned ${item.primaryGenreName} artist, celebrated for landmark releases such as "${item.collectionName}" (${releaseYear}) and iconic tracks like "${item.trackName}". Mastered for analog warmth and available on heavyweight vinyl at Echo Records.`,
            });
          }
        });

        setArtists(Array.from(uniqueArtistsMap.values()).slice(0, 18));
      } catch (error) {
        console.error("Error fetching artists from iTunes API:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchArtists();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleMouseEnter = (artist) => {
    if (!artist.previewUrl || !audioRef.current) return;
    setPlayingId(artist.id);
    audioRef.current.src = artist.previewUrl;
    audioRef.current.currentTime = 0;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setPlayingId(null);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white py-12 px-6 lg:px-16">
      <audio ref={audioRef} preload="none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-tight">
              ARTISTS
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Discover the legends behind our vinyl pressings
            </p>
          </div>

          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search any artist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none transition-colors text-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-zinc-900/50 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : artists.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 text-sm">
            No artists found for "{searchTerm}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
                onMouseEnter={() => handleMouseEnter(artist)}
                onMouseLeave={handleMouseLeave}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 flex flex-col justify-end p-6 cursor-pointer"
              >
                {artist.image && (
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {playingId === artist.id && (
                  <div className="absolute top-4 right-4 z-20 text-[#8B0000] bg-black/70 backdrop-blur-md p-2 rounded-full border border-[#8B0000]/40">
                    <Disc3 className="w-5 h-5 animate-spin" />
                  </div>
                )}

                <div className="relative z-10 flex flex-col items-start gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-white group-hover:text-[#8B0000] transition-colors">
                      {artist.name}
                    </h2>
                    <p className="text-xs text-zinc-400">{artist.genre}</p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/artists/${artist.id}`, { state: { artist } })
                    }
                    className="px-4 py-1.5 rounded-full text-xs font-medium border border-zinc-600 text-white bg-black/40 backdrop-blur-sm hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
                  >
                    Read story
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Artists;