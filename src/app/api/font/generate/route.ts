import { createCanvas, registerFont } from "canvas";
import path from "path";
import fs from "fs";
import { FONT_NAME, FONT_TYPE } from "@/app/constants";
const fontPath = path.join(process.cwd(), "private", "fonts", `${FONT_NAME}.${FONT_TYPE}`);
registerFont(fontPath, { family: FONT_NAME as string });

export async function POST(req: Request) {
  const { characters } = await req.json();

  if (characters.length > 12) {
    return new Response("No more than 12 characters", { status: 400 });
  }

  try {
    const canvas = createCanvas(450, 400);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `35px ${FONT_NAME}`;
    ctx.fillStyle = "black";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const text = characters;
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    ctx.fillText(text, x, y);

    const buffer = canvas.toBuffer("image/png");
    const base64 = buffer.toString("base64");
    if (process.env.NODE_ENV !== "production") {
      fs.writeFileSync(path.join(process.cwd(), "public", "images", `image.png`), buffer);
    }
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
