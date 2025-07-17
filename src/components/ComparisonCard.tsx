import React from "react";

interface ComparisonCardProps {
  image1: string;
  image2: string;
  opacity: number;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ image1, image2, opacity }) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 transition-opacity duration-500 px-4" // Adjusted gap, added horizontal padding
      style={{ opacity }}
    >
      <img
        src={image1}
        alt="Imagem de comparação 1"
        className="w-40 h-60 sm:w-48 sm:h-72 object-cover rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:-rotate-6 shadow-lg shadow-black/50" // Adjusted w/h for smaller screens, added sm breakpoint
      />

      {/* Consider making "IGUALZINHO" visible on mobile with a smaller font, or remove it */}
      <div className="px-4">
        <h2 className="text-2xl sm:text-4xl font-black text-white italic tracking-tighter transition-all duration-300 group-hover:scale-125"> {/* Adjusted font size for mobile */}
          IGUALZINHO
        </h2>
      </div>

      <img
        src={image2}
        alt="Imagem de comparação 2"
        className="w-40 h-60 sm:w-48 sm:h-72 object-cover rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-6 shadow-lg shadow-black/50" // Adjusted w/h for smaller screens, added sm breakpoint
      />
    </div>
  );
};

export default ComparisonCard;