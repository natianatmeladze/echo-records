import React from "react";
import Hero from "../components/Hero";
import PopularAlbums from "../components/PopularAlbums";
import FeaturedArtist from "../components/FeaturedArtist";
import VinylExperience from "../components/VinylExperience";
import BrowseGenres from "../components/BrowseGenres";

const Home = () => {
  return (
    <main className="flex-grow bg-[#0D0D0D]">
      <Hero />
      <PopularAlbums />
      <FeaturedArtist />
      <VinylExperience />
      <BrowseGenres />
    </main>
  );
};

export default Home;