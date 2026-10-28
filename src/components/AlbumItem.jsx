import Button from "./Button";

const AlbumItem = ({ album }) => {
  return (
    <div className="group flex flex-col cursor-pointer justify-between p-4 rounded-xl transition-all duration-300">
      <div className="flex flex-col gap-3">

        <div className="relative aspect-square w-full rounded-lg overflow-hidden group/cover">
          <img
            src={album.cover}
            alt={album.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
            <button 
              onClick={() => console.log(`Details: ${album.title}`)}
              className="px-4 py-2 bg-white/10 backdrop-blur-md text-white cursor-pointer text-xs font-medium rounded-full border border-white/20 hover:bg-white hover:text-black transition-all"
            >
              See Details
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-white text-sm tracking-tight group-hover:text-[#8B0000] transition-colors truncate">
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
          onClick={() => console.log(`Added: ${album.title}`)}
        />
      </div>
    </div>
  );
};

export default AlbumItem;