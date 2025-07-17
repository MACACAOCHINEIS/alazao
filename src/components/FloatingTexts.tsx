import React, { useEffect, useState } from "react";

const TEXTS: string[] = [
  "Meu macaco preferido", "Meu roludinho", "Meu pintinho", "Micropênisudinho",
  "Fimosento", "Mela cueca", "Cuzinho frouxo", "Tetudão", "Mala",
  "Tem espinho nessa bosta dessa pizza???", "M.. M.. Me responda pra mim",
  "OH KARAIO 7 HORA E NAO VORTO PA CASA", "Viu mala, passando pra avisa que ce tem casa",
  "Ja passei no derci, e.. ta cumpricado cara..", "VIU MALA CAIU O MURO",
  "Vamo te que i embora :(...", "Quem tem amigo é puta cara",
  "EU QUERO I LA NO GINASIO E VE ESSE TAL DE AMIGO", "DRAGAO", "BURRINHO DO SHREK",
];

interface Position {
  id: number;
  text: string;
  top: string;
  left: string;
  dx: number;
  dy: number;
  delay: string;
}

const FloatingTexts: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const calculatedPositions: Position[] = TEXTS.map((text, index) => ({
      id: index,
      text: text,
      top: `${Math.random() * 90 + 5}%`, // Keep texts more within bounds
      left: `${Math.random() * 90 + 5}%`, // Keep texts more within bounds
      dx: Math.random() * 60 - 30, // Reduced movement range for mobile
      dy: Math.random() * 60 - 30, // Reduced movement range for mobile
      delay: `${index * 50}ms`,
    }));
    setPositions(calculatedPositions);
  }, []);

  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
      {positions.map((item) => (
        <h5
          key={item.id}
          // Removed opacity-0 and group-hover:opacity-100
          className="absolute transition-all duration-1000 ease-in-out text-white whitespace-nowrap text-xs sm:text-sm opacity-100" // Added opacity-100 to always be visible
          style={{
            top: item.top,
            left: item.left,
            transform: `translate(calc(${item.dx}vw - 50%), calc(${item.dy}vh - 50%))`,
            transitionDelay: item.delay,
            filter: "drop-shadow(0 0 3px rgba(255,255,255,0.6))",
          }}
        >
          {item.text}
        </h5>
      ))}
    </div>
  );
};

export default FloatingTexts;