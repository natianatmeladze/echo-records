import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, Disc3, Music } from "lucide-react";
import AlbumsList from "../components/AlbumsList";

const ArtistDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [artist, setArtist] = useState(location.state?.artist || null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistAndAlbums = async () => {
      try {
        setLoading(true);

        // entity: "song" მოგვცემს როგორც ალბომის ინფორმაციას, ისე previewUrl აუდიოს
        const response = await axios.get("https://itunes.apple.com/lookup", {
          params: {
            id,
            entity: "song",
            limit: 40,
          },
        });

        const results = response.data.results || [];

        const artistInfo = results.find((item) => item.wrapperType === "artist");
        const trackResults = results.filter(
          (item) => item.wrapperType === "track" && item.collectionId
        );

        // უნიკალური ალბომების ამოღება თავისი previewUrl-ით
        const uniqueAlbumsMap = new Map();

        trackResults.forEach((item) => {
          if (!uniqueAlbumsMap.has(item.collectionId)) {
            const index = uniqueAlbumsMap.size;
            uniqueAlbumsMap.set(item.collectionId, {
              id: item.collectionId,
              title: item.collectionName.replace(
                / - Single| Vinyl| \[Vinyl\]/gi,
                ""
              ),
              artist: item.artistName,
              genre: item.primaryGenreName,
              price: `$${(24 + (index % 5) * 4).toFixed(2)}`,
              cover: item.artworkUrl100
                ? item.artworkUrl100.replace("100x100bb", "600x600bb")
                : "",
              previewUrl: item.previewUrl || null,
            });
          } else if (
            !uniqueAlbumsMap.get(item.collectionId).previewUrl &&
            item.previewUrl
          ) {
            uniqueAlbumsMap.get(item.collectionId).previewUrl = item.previewUrl;
          }
        });

        const formattedAlbums = Array.from(uniqueAlbumsMap.values()).slice(0, 12);

        if (!artist && artistInfo) {
          setArtist({
            id: artistInfo.artistId,
            name: artistInfo.artistName,
            genre: artistInfo.primaryGenreName || "Music",
            image: formattedAlbums[0]?.cover || "",
            country: "International",
            story: `${artistInfo.artistName} is a celebrated ${
              artistInfo.primaryGenreName || "recording"
            } artist whose catalog is mastered for analog warmth and pressed on heavyweight 180g vinyl at Echo Records.`,
          });
        }

        setAlbums(formattedAlbums);
      } catch (error) {
        console.error("Failed to load artist details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistAndAlbums();
  }, [id]);

  if (loading && !artist) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-zinc-400 flex items-center justify-center">
        Loading artist story...
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-400">Artist not found.</p>
        <button
          onClick={() => navigate("/artists")}
          className="px-6 py-2.5 rounded-full bg-[#8B0000] text-xs font-semibold uppercase tracking-wider cursor-pointer"
        >
          Back to Artists
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white py-12 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        {/* უკან დაბრუნების ღილაკი */}
        <div>
          <button
            onClick={() => navigate("/artists")}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Artists
          </button>
        </div>

        {/* არტისტის პროფილი და ისტორია */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-zinc-800 pb-14"
        >
          <div className="lg:col-span-5">
            <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
              {artist.image ? (
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                  <Disc3 className="w-16 h-16" />
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest">
              <span className="px-3 py-1 rounded-full bg-[#8B0000]/20 text-[#8B0000] border border-[#8B0000]/40 font-semibold">
                {artist.genre}
              </span>
              {artist.country && (
                <span className="text-zinc-500">{artist.country}</span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-normal uppercase tracking-tight">
              {artist.name}
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {artist.story}
            </p>

            {artist.featuredTrack && (
              <div className="flex items-center gap-3 pt-2 text-xs text-zinc-400">
                <Music className="w-4 h-4 text-[#8B0000]" />
                <span>
                  Signature Track:{" "}
                  <strong className="text-white font-medium">
                    {artist.featuredTrack}
                  </strong>
                </span>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-col gap-8"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal uppercase tracking-tight">
              VINYL RELEASES
            </h2>
            <p className="text-zinc-400 text-xs mt-1">
              Available pressings by {artist.name}
            </p>
          </div>

          {loading ? (
            <div className="text-zinc-500 text-sm py-10">
              Loading vinyl releases...
            </div>
          ) : albums.length === 0 ? (
            <div className="text-zinc-500 text-sm py-10">
              No vinyl releases currently listed for this artist.
            </div>
          ) : (
            <AlbumsList albums={albums} />
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default ArtistDetails;