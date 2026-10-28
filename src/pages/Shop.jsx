import { useState, useEffect } from "react";
import axios from "axios";
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

        const response = await axios.get("https://itunes.apple.com/search", {
          params: {
            term:
              selectedGenre === "All" ? "top albums" : `${selectedGenre} hits`,
            entity: "album",
            limit: 60,
          },
        });

        const formatted = response.data.results.map((item, index) => ({
          id: item.collectionId || index,
          title: item.collectionName,
          artist: item.artistName,
          genre: item.primaryGenreName,
          price: `$${(22 + (index % 5) * 4).toFixed(2)}`,
          cover: item.artworkUrl100
            ? item.artworkUrl100.replace("100x100bb", "600x600bb")
            : "",
        }));

        setAlbums(formatted);
      } catch (err) {
        setError("Failed to fetch albums");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [selectedGenre]);

  const filteredAlbums = albums.filter((album) => {
    return (
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white py-12 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-800 pb-8">
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
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedGenre === genre
                  ? "bg-[#8B0000] text-white shadow-lg"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500">
            Loading albums...
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : (
          <AlbumsList albums={filteredAlbums} />
        )}
      </div>
    </div>
  );
};

export default Shop;
