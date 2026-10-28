
import Button from "./Button";
import heroVinyl from "../assets/vinyl-record.jpg"; 

const Hero = () => {
  return (
    <section className="relative h-[calc(100vh-88px)] w-full overflow-hidden bg-[#0D0D0D] flex items-center justify-start px-6 lg:px-16">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 13, 13, 0.5), rgba(13, 13, 13, 0.5)), url(${heroVinyl})`,
        }}
      />

      <div className="max-w-7xl w-full mx-auto z-10 py-12">
        <div className="max-w-2xl flex flex-col gap-6">
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.1]">
            SPIN THE CLASSICS.
            DISCOVER THE NEW.
          </h1>

          <p className="text-zinc-100 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-xl">
            From rare vintage pressings to the latest indie releases - find the physical soul of your favorite music.
          </p>

          {/* ღილაკები */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
            <Button 
              text="Explore Vinyls" 
              to="/shop" 
              bg="bg-[#8B0000]" 
              textColor="text-black" 
            />
            
            <Button 
              text="Discover Artists" 
              to="/artists" 
              bg="bg-white" 
              textColor="text-black" 
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;