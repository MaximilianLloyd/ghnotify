import { db, userStats as userStatsTable } from "@/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const emailFrequency = request.nextUrl.searchParams.get("emailFrequency");

  if (!emailFrequency) {
    return new Response("Email frequency is required", { status: 400 });
  }

  const userStats = await db.select().from(userStatsTable).where();
}
