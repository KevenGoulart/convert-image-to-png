"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRef, useState } from "react";

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
    <div className="bg-slate-900 h-screen">
      <div className="flex flex-col items-center gap-4 max-w-[500px] mx-auto pt-16">
         <h1 className="text-4xl font-bold">Converter para PNG</h1>

         <Image src='/shinji.gif' alt="shinji" width={200} height={200} className="rounded-[60px]" />

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
        className="bg-purple-800 hover:bg-purple-700 text-white px-3 py-2 text-lg rounded-lg cursor-pointer"
      >
        {loading ? "Convertendo..." : "Converter"}
      </Button>
      </div>
    </div>
  );
}
