"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const Home = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShowLogo(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!showLogo) return;
    const t = setTimeout(() => setShowText(true), 300); // show text after logo
    return () => clearTimeout(t);
  }, [showLogo]);

  return (
    <main className="min-h-screen bg-[#326273] grid place-items-center px-4">
      <div className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] text-center">
        <Image
          src="/assets/TijanLogoWhite.png"
          alt="Tijan logo"
          width={520}
          height={520}
          priority
          className={`
            w-full h-auto
            transition-all duration-700 ease-out
            ${showLogo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 520px"
        />

        <p
          className={`
            mt-6 text-white/90 font-medium
            text-lg sm:text-xl md:text-2xl
            transition-all duration-700 ease-out
            ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          قريباً...4-2026
        </p>
      </div>
    </main>
  );
};

export default Home;
