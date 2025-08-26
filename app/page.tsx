"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <main
      className={`
        min-h-screen bg-[#326273] grid place-items-center
        transition-all duration-700 ease-out
        ${isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      {/* Replace with your own image */}
      <Image
        src="/placeholder.png"
        alt="Landing image"
        width={320}
        height={320}
        priority
        className="max-w-[90vw] h-auto"
      />
    </main>
  );
}
