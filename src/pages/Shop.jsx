import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AlbumsList from "../components/AlbumsList";

const GENRES = ["All", "Rock", "Pop", "Indie", "Jazz", "Electronic"];

const Shop = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        setError(null);

        const query = searchTerm.trim()
          ? searchTerm.trim()
          : selectedGenre === "All"
          ? "top albums"
          : `${selectedGenre} hits`;

        const response = await axios.get("https://itunes.apple.com/search", {
          params: {
            term: query,
            entity: "song",
            limit: 100,
          },
        });

        const uniqueAlbumsMap = new Map();

        response.data.results.forEach((item) => {
          if (item.collectionId && !uniqueAlbumsMap.has(item.collectionId)) {
            uniqueAlbumsMap.set(item.collectionId, item);
          }
        });

        const formatted = Array.from(uniqueAlbumsMap.values()).map(
          (item, index) => ({
            id: item.collectionId || index,
            title: item.collectionName
              ? item.collectionName.replace(/ - Single| Vinyl| \[Vinyl\]/gi, "")
              : item.trackName,
            artist: item.artistName,
            genre: item.primaryGenreName,
            price: `$${(22 + (index % 5) * 4).toFixed(2)}`,
            cover: item.artworkUrl100
              ? item.artworkUrl100.replace("100x100bb", "600x600bb")
              : "",
            previewUrl: item.previewUrl,
          })
        );

        setAlbums(formatted);
      } catch (err) {
        setError("Failed to fetch albums");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchAlbums();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [selectedGenre, searchTerm]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white py-12 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-800 pb-8"
        >
          <div>
            <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-tight">
              SHOP VINYLS
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Explore our curated physical collection
            </p>
          </div>

          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search by title or artist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none transition-colors text-sm"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2.5 sm:gap-3"
        >
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => {
                setSelectedGenre(genre);
                setSearchTerm("");
              }}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedGenre === genre && !searchTerm
                  ? "bg-[#8B0000] text-white shadow-lg"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              {genre}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500">
            Loading albums...
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : albums.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            No albums found for "{searchTerm}".
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <AlbumsList albums={albums} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Shop;