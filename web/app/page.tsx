"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import Bg from "../public/impre.png";
import { MorphingText } from "@/components/ui/morphing-text";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import {
  BsFiletypeBmp,
  BsFiletypeGif,
  BsFiletypeJpg,
  BsFiletypePng,
} from "react-icons/bs";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleConvert() {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:3333/convert", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.png";
    a.click();
    URL.revokeObjectURL(url);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);

    setLoading(false);
  }

  return (
    <div className="h-screen bg-linear-to-b from-[#ccb790] to-white/80 flex justify-center items-center">
      <div className="relative max-w-[550px] w-full">
        <OrbitingCircles
          radius={170}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <BsFiletypePng size={40} />
        </OrbitingCircles>

        <OrbitingCircles
          radius={220}
          reverse
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <BsFiletypeJpg size={40} />
          <BsFiletypeGif size={40} />
          <BsFiletypeBmp size={40} />
        </OrbitingCircles>

        <div className="flex flex-col items-center gap-4 bg-amber-800/40 h-[640px] p-6 rounded-[80px] relative z-10">
          <h1 className="text-5xl font-bold">Converter para PNG</h1>

          <div className="flex flex-col w-[200px] items-center m-auto gap-2 pb-8">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="bg-slate-800 p-2 rounded-lg cursor-pointer w-[300px] text-center h-auto"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />

            <Button
              onClick={handleConvert}
              disabled={!file || loading}
              className="bg-amber-950/50 hover:bg-amber-950/30 text-white px-3 py-2 text-lg rounded-lg"
            >
              {loading ? "Convertendo..." : "Converter"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
