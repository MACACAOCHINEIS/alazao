import React, { useEffect, useState } from "react";
import ComparisonCard from "./components/ComparisonCard";
import FloatingTexts from "./components/FloatingTexts";

const App: React.FC = () => {
  const [textOpacity, setTextOpacity] = useState<number>(1);
  const [imagesOpacity, setImagesOpacity] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const screenHeight = window.innerHeight;

      const newTextOpacity = Math.max(1 - scroll / (screenHeight * 0.5), 0);
      setTextOpacity(newTextOpacity);

      const scrollPercent = Math.min(scroll / screenHeight, 1);

      setImagesOpacity([
        Math.max(0, Math.min(scrollPercent * 2, 1)),
        Math.max(0, Math.min((scrollPercent - 0.1) * 2, 1)),
      ]);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="w-full min-h-[320vh] bg-black text-white relative overflow-hidden">
      {/* Background Videos */}
      <video
        autoPlay
        loop
        playsInline // Essential for autoplay on mobile devices
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-60" // Adjust opacity as needed
        src="asda1290381chdfeu.mp4" // Path to your first video file
      >
        Your browser does not support the video tag.
      </video>
      <video
        autoPlay
        loop
        playsInline // Essential for autoplay on mobile devices
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20" // Adjust opacity as needed
        style={{ animation: 'videoFadeInLoop 20s infinite alternate' }} // Optional: add an animation to cycle opacity
        src="VID_20240301_101509.mp4" // Path to your second video file
      >
        Your browser does not support the video tag.
      </video>

      <p className="fixed top-2 left-1/2 -translate-x-1/2 text-center text-xs font-bold italic text-gray-500 z-50">
        Feito com muito amor pelo seu bejador de homi preferido🤍
      </p>

      <section
        className="fixed top-0 left-0 w-full h-screen flex justify-center items-center pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <h1
          className="font-black leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(60px, 17vw, 250px)" }}
        >
          ALAZAO
        </h1>
      </section>

      <section className="absolute top-[100vh] left-0 w-full min-h-screen flex flex-col items-center justify-center gap-16 p-8 group">
        <FloatingTexts />

        <div className="relative z-20 flex flex-col items-center justify-center gap-16 lg:gap-24">
          <ComparisonCard
            image1="IMG_20240308_113915.jpg"
            image2="favicon.png"
            opacity={imagesOpacity[0]}
          />
          <ComparisonCard
            image1="images.jpeg"
            image2="509621407_18174238954331439_7993599491221925143_n.jpg"
            opacity={imagesOpacity[1]}
          />
        </div>
      </section>
    </main>
  );
};

export default App;