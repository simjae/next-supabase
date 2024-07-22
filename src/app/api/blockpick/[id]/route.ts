// app/api/blockpicks/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

let blockpicks = [
  {
    id: 1,
    title: "Blockpick 1",
    content: "Description for Blockpick 1",
    status: "ACTIVE",
    rounds: [
      {
        id: 1,
        round: 1,
        bp: 100,
        round_pick_count: 10,
        round_prize_amount: 1000,
        round_start_at: new Date().toISOString(),
        round_end_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 2,
    title: "Blockpick 2",
    content: "Description for Blockpick 2",
    status: "INACTIVE",
    rounds: [],
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const blockpick = blockpicks.find((bp) => bp.id === id);
    if (!blockpick) {
      return NextResponse.json(
        { error: "Blockpick not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(blockpick);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blockpick" },
      { status: 500 }
    );
  }
}
