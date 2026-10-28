import AlbumItem from "./AlbumItem";

const AlbumsList = ({ albums }) => {
  if (!albums || albums.length === 0) {
    return (
      <div className="text-center py-20 text-zinc-500">
        Album not found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {albums.map((album) => (
        <AlbumItem key={album.id} album={album} />
      ))}
    </div>
  );
};

export default AlbumsList;