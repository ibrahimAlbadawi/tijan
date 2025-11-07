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
    <main className="min-h-screen  grid place-items-center px-4">
      <div className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] text-center">
        Landing page (under construction)
      </div>
    </main>
  );
};

export default Home;
