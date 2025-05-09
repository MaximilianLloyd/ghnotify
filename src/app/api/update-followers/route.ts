import { db, userStats } from "@/db";
import { NextResponse } from "next/server";
import { getFollowers } from "@/lib/github/api";
import { eq } from "drizzle-orm";

export async function GET() {
  const users = await db.select().from(userStats);

  for (const user of users) {
    const followers = await getFollowers({ username: user.username });

    await db
      .update(userStats)
      .set({
        followers: followers.map((f) => f.login),
      })
      .where(eq(userStats.username, user.username));
  }

  return NextResponse.json(
    { message: "Followers updated successfully" },
    { status: 200 },
  );
}
