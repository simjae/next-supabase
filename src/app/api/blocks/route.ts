import { NextRequest, NextResponse } from "next/server";

let blocks = Array.from({ length: 1000000 }, (_, i) => ({
  id: i,
  x: (i % 100) * 22,
  y: Math.floor(i / 100) * 22,
  overlay: i % 10 === 0 ? "https://example.com/overlay.png" : undefined,
}));

export async function GET() {
  return NextResponse.json(blocks);
}

export async function POST(request: NextRequest) {
  const { id, overlay } = await request.json();
  blocks = blocks.map((block) =>
    block.id === id ? { ...block, overlay } : block
  );
  return NextResponse.json({ message: "Block updated" });
}

export async function PUT(request: NextRequest) {
  const { length } = await request.json();
  blocks = Array.from({ length }, (_, i) => ({
    id: i,
    x: (i % 100) * 22,
    y: Math.floor(i / 100) * 22,
    overlay: i % 10 === 0 ? "https://example.com/overlay.png" : undefined,
  }));
  return NextResponse.json({ message: "Blocks length updated", blocks });
}
