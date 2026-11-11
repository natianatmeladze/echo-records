import React from "react";
import { Disc, ShieldCheck, Truck, Radio } from "lucide-react";

const features = [
  {
    icon: Disc,
    title: "100% HEAVYWEIGHT VINYL",
    description:
      "Pressed on premium 180g audiophile vinyl for maximum durability and rich analog depth.",
  },
  {
    icon: ShieldCheck,
    title: "PROTECTIVE SLEEVE PACKAGING",
    description:
      "Every album comes in anti-static inner sleeves and heavy-duty outer mailers to guarantee perfect condition.",
  },
  {
    icon: Truck,
    title: "SECURE WORLDWIDE SHIPPING",
    description:
      "Specially designed cardboard boxes ensure safe transport directly to your turntable.",
  },
  {
    icon: Radio,
    title: "CURATED ANALOG SOUND",
    description:
      "Hand-selected pressings mastered directly from original analog tapes for true sound lovers.",
  },
];

const VinylExperience = () => {
  return (
    <section className="w-full px-6 lg:px-16 py-16 bg-[#0D0D0D] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-start text-center gap-2">
          <span className="text-md font-bold tracking-widest text-[#8B0000] uppercase">
            WHY ECHO RECORDS
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight uppercase">
            THE ULTIMATE VINYL EXPERIENCE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-zinc-900/30 cursor-pointer border border-zinc-800/80 rounded-2xl p-6 flex flex-col items-start gap-4 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 group"
              >
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-white group-hover:text-[#8B0000] group-hover:border-[#8B0000]/40 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VinylExperience;