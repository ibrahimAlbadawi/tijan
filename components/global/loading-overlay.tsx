"use client";

import Image from "next/image";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center gap-3">

        <Image
          src="/assets/TijanIconColored.png"
          alt="Tijan Logo"
          width={200}
          height={200}
          className="breathe"
        />

      </div>
    </div>
  );
}
