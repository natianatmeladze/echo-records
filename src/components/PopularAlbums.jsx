import React, { useState, useEffect } from "react";
import axios from "axios";
import AlbumItem from "./AlbumItem";

const PopularAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecificAlbums = async () => {
      try {
        const bands = [
          "Pink Floyd",
          "System of a Down",
          "Queen",
          "The Beatles",
          "Radiohead",
          "Bon Jovi",
          "Nirvana",
          "AC/DC",
        ];

        const requests = bands.map((band) =>
          axios.get("https://itunes.apple.com/search", {
            params: {
              term: band,
              entity: "song",
              limit: 1,
            },
          })
        );

        const responses = await Promise.all(requests);

        const formatted = responses
          .map((res, index) => {
            const item = res.data.results[0];
            if (!item) return null;

            return {
              id: item.collectionId || item.trackId || index,
              title: item.collectionName
                ? item.collectionName.replace(/ - Single| Vinyl| [Vinyl]/gi, "")
                : item.trackName,
              artist: item.artistName,
              genre: item.primaryGenreName,
              price: `$${(24 + (index % 4) * 5).toFixed(2)}`,
              cover: item.artworkUrl100
                ? item.artworkUrl100.replace("100x100bb", "600x600bb")
                : "",
              previewUrl: item.previewUrl, 
            };
          })
          .filter(Boolean);

        setAlbums(formatted);
      } catch (error) {
        console.error("Error fetching rock albums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecificAlbums();
  }, []);

  return (
    <section className="w-full px-6 lg:px-16 py-12 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h2 className="text-xl md:text-2xl font-bold tracking-wider uppercase text-white">
            POPULAR ALBUMS
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-72 bg-zinc-900/50 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {albums.map((album) => (
              <AlbumItem key={album.id} album={album} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularAlbums;