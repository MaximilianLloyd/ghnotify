import { db, subscriptions } from "@/db";
import { and, eq } from "drizzle-orm";

type UnsubscribeData = {
  email: string;
  username: string;
};

export async function POST(request: Request) {
  const { email, username } = (await request.json()) as UnsubscribeData;

  // delete subscription
  await db
    .delete(subscriptions)
    .where(
      and(eq(subscriptions.email, email), eq(subscriptions.username, username)),
    );

  // respose
  return new Response("Unsubscribed successfully", { status: 200 });
}
