"use client";

import Image from "next/image";
import { images } from "@/constants/images";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center gap-3">

        <Image
          src={images.icon_white}
          alt="Tijan Logo"
          width={150}
          height={150}
          className="breathe"
        />

      </div>
    </div>
  );
}
