"use client";
import { useRef } from "react";

export default function Home() {
  const generatedImage = useRef<HTMLImageElement>();

  const inputRef = useRef<HTMLInputElement>();

  function generateImage() {
    if (inputRef.current!.value.length > 12) {
      alert("No more than 12 characters");
      return;
    }
    fetch("/api/font/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        characters: inputRef.current!.value,
      }),
    })
      .then((res) => res.blob())
      .then(async (blob) => {
        const base64 = await blob.text();
        generatedImage.current!.src = `data:image/png;base64,${base64}`;
        console.log(blob);
      });
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1>Font Image Creator</h1>
      <div>
        <input ref={inputRef as any} type="text" className="text-black" placeholder="请输入字符" />
        <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={generateImage}>
          Generate
        </button>
      </div>
      <div className="flex justify-center bg-white w-[400px] h-[300px] rounded-lg">
        <img className="object-contain" width={400} height={300} ref={generatedImage as any} src="/placeholder.png" alt="" />
      </div>
    </main>
  );
}
