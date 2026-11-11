import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Button from "../components/Button";
import { ArrowLeft, Play, Pause, Disc } from "lucide-react";

const AlbumDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [album, setAlbum] = useState(location.state?.album || null);
  const [loading, setLoading] = useState(!album);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    if (!album) {
      const fetchAlbumDetails = async () => {
        try {
          const response = await axios.get("https://itunes.apple.com/lookup", {
            params: { id, entity: "song" },
          });
          const item = response.data.results[0];
          if (item) {
            setAlbum({
              id: item.collectionId || item.trackId,
              title: item.collectionName || item.trackName,
              artist: item.artistName,
              genre: item.primaryGenreName,
              releaseDate: item.releaseDate
                ? new Date(item.releaseDate).getFullYear()
                : "N/A",
              price: "$29.00",
              cover: item.artworkUrl100
                ? item.artworkUrl100.replace("100x100bb", "600x600bb")
                : "",
              previewUrl: item.previewUrl,
            });
          }
        } catch (error) {
          console.error("Error fetching album details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAlbumDetails();
    }
  }, [id, album]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center text-white">
        Loading album details...
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center text-white">
        Album not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white py-12 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors w-fit cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-6 md:p-12">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
            <img
              src={album.cover}
              alt={album.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold tracking-widest text-[#8B0000] uppercase">
                {album.genre || "VINYL RELEASE"}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                {album.title}
              </h1>
              <p className="text-zinc-400 text-lg font-medium">
                By {album.artist}
              </p>
            </div>

            <div className="text-3xl font-bold text-white">{album.price}</div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              High-fidelity 180g vinyl pressing masterfully restored for authentic analog warmth. Includes original artwork and protective inner sleeve.
            </p>

            {album.previewUrl && (
              <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between gap-4">
                <audio
                  ref={audioRef}
                  src={album.previewUrl}
                  onEnded={() => setIsPlaying(false)}
                />
                <div className="flex items-center gap-3">
                  <Disc
                    className={`w-6 h-6 text-[#8B0000] ${
                      isPlaying ? "animate-spin" : ""
                    }`}
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase">
                      Audio Preview
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      30 Sec Sample
                    </span>
                  </div>
                </div>

                <button
                  onClick={toggleAudio}
                  className="p-3 bg-[#8B0000] hover:bg-red-700 text-white rounded-full transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>
              </div>
            )}

            <div className="pt-2 w-full sm:w-auto">
              <Button
                text="Add to Cart"
                bg="bg-white hover:bg-zinc-200"
                textColor="text-black text-xs font-bold uppercase tracking-wider py-3.5 px-8"
                onClick={() => addToCart(album)}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AlbumDetails;