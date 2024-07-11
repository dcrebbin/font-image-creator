import { createCanvas, registerFont } from "canvas";
import path from "path";
import fs from "fs";
const fontPath = path.join(process.cwd(), "private", "fonts", `XiaolaiSC-Regular.ttf`);
registerFont(fontPath, { family: "XiaolaiSC-Regular" as string });

export async function POST(req: Request) {
  const { characters } = await req.json();

  try {
    const characterLength = characters.length;
    const characterWidth = characterLength * 57;
    const canvas = createCanvas(characterWidth, 200);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `50px XiaolaiSC-Regular`;
    ctx.fillStyle = "black";
    ctx.fillText(characters, 20, 100);

    const buffer = canvas.toBuffer("image/png");
    const base64 = buffer.toString("base64");

    fs.writeFileSync(path.join(process.cwd(), "public", "images", `image.png`), buffer);

    return new Response(base64, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.error("Error generating image:", error);
  }
  return new Response("Error generating image", { status: 500 });
}
