import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), "public", "images");
    const files = await fs.readdir(imagesDir);
    const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];
    const images = files
      .filter((f) => allowed.includes(path.extname(f).toLowerCase()))
      .map((f) => ({ name: f, url: `/images/${f}` }));
    return NextResponse.json(images);
  } catch {
    return NextResponse.json([]);
  }
}
