import React, { useEffect, useState, useRef } from "react";
import ComparisonCard from "./components/ComparisonCard";
import FloatingTexts from "./components/FloatingTexts";

const App: React.FC = () => {
  const [textOpacity, setTextOpacity] = useState<number>(1);
  const [imagesOpacity, setImagesOpacity] = useState<[number, number]>([0, 0]);
  const [isMuted, setIsMuted] = useState<boolean>(true); // Começa mutado
  const [showUnmuteButton, setShowUnmuteButton] = useState<boolean>(true); // Controla a visibilidade do botão

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

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

    // Garante que os vídeos comecem mutados
    if (videoRef1.current) {
      videoRef1.current.muted = isMuted;
      console.log("Inicialização: Video 1 mutado?", videoRef1.current.muted);
    }
    if (videoRef2.current) {
      videoRef2.current.muted = isMuted;
      console.log("Inicialização: Video 2 mutado?", videoRef2.current.muted);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMuted]); // Re-executa se isMuted mudar, para aplicar a propriedade

  const toggleMute = () => {
    console.log("Botão de ativar som clicado. isMuted atual:", isMuted);
    // Só tenta desmutar se estiver mutado e o botão estiver visível
    if (isMuted) {
      setIsMuted(false); // Define como desmutado
      setShowUnmuteButton(false); // Esconde o botão após o clique

      if (videoRef1.current) {
        videoRef1.current.muted = false; // Desmuta o vídeo
        console.log("Video 1: tentando desmutar. Novo status muted:", videoRef1.current.muted);
        // Tenta dar play explicitamente após desmutar
        videoRef1.current.play()
          .then(() => {
            console.log("Video 1: Play() bem-sucedido.");
          })
          .catch(error => {
            console.error("Video 1: Erro ao tentar tocar (play()) após desmutar:", error);
            // Isso geralmente indica que o navegador bloqueou.
            // A mensagem de erro aqui é CRUCIAL para entender o porquê.
          });
      }
      if (videoRef2.current) {
        videoRef2.current.muted = false; // Desmuta o vídeo
        console.log("Video 2: tentando desmutar. Novo status muted:", videoRef2.current.muted);
        videoRef2.current.play()
          .then(() => {
            console.log("Video 2: Play() bem-sucedido.");
          })
          .catch(error => {
            console.error("Video 2: Erro ao tentar tocar (play()) após desmutar:", error);
          });
      }
    } else {
        console.log("Vídeo já está desmutado ou botão não deveria estar visível.");
    }
  };

  return (
    <main className="w-full min-h-[320vh] bg-black text-white relative overflow-hidden">
      {/* Background Videos */}
      <video
        ref={videoRef1}
        autoPlay
        loop
        playsInline
        muted={isMuted} // Controlado pelo estado isMuted
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-60"
        src="asda1290381chdfeu.mp4"
      >
        Your browser does not support the video tag.
      </video>
      <video
        ref={videoRef2}
        autoPlay
        loop
        playsInline
        muted={isMuted} // Controlado pelo estado isMuted
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"
        style={{ animation: 'videoFadeInLoop 20s infinite alternate' }}
        src="VID_20240301_101509.mp4"
      >
        Your browser does not support the video tag.
      </video>

      {/* Botão de Unmute Flutuante (mostrado apenas se estiver mutado e showUnmuteButton for true) */}
      {isMuted && showUnmuteButton && (
        <button
          onClick={toggleMute}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50
                     bg-red-600 text-white font-bold text-lg px-6 py-3 rounded-full
                     shadow-lg hover:bg-red-700 transition-all duration-300
                     flex items-center gap-2 animate-bounce cursor-pointer
                     focus:outline-none focus:ring-4 focus:ring-red-300"
          aria-label="Ativar som do vídeo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464A5 5 0 0117 12h-2m-4.596 0a5 5 0 01-9-3h2m9 3a5 5 0 01-9 3h2m-4.596 0A5 5 0 0117 12h-2m-4.596 0v0a5 5 0 01-9 3h2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          </svg>
          Ver efeitos na imagem
        </button>
      )}

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