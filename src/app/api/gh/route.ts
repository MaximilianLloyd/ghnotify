import { db, subscriptions } from "@/db";
import { GitHubUser } from "@/lib/github/types";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("Hitting endpoint");
  const { username, email } = (await request.json()) as {
    username: string;
    email: string;
  };

  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token ${process.env.GH_TOKEN}`,
    },
  });
  const data = (await res.json()) as GitHubUser;

  if (res.status === 404) {
    return new NextResponse("GitHub user not found", { status: 404 });
  }

  if (data.followers > 1000) {
    return new NextResponse(
      "Follower tracking is only supported for accounts with fewer than 1000 followers.",
      { status: 400 },
    );
  }

  // Check if there is an active subscription for this user
  const [existingSubscription] = await db
    .select()
    .from(subscriptions)
    .where(
      and(eq(subscriptions.username, username), eq(subscriptions.email, email)),
    );

  if (existingSubscription) {
    return new NextResponse("User already subscribed", { status: 400 });
  }

  return NextResponse.json({ message: "User found" }, { status: 200 });
}
