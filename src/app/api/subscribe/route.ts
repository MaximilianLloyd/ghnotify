import { db, subscriptions, userStats } from "@/db";
import { sendEmail } from "@/lib/email/resend";
import { subscriptionConfirmation } from "@/lib/email/email";
import { getUser, getFollowers } from "@/lib/github/api";
import { eq } from "drizzle-orm";

type SubscribeData = {
  email: string;
  username: string;
  emailFrequency: "daily" | "weekly" | "monthly" | "hourly";
};

export async function POST(request: Request) {
  const { email, username, emailFrequency } =
    (await request.json()) as SubscribeData;
  const ghUser = await getUser({ username });

  let [existingUser] = await db
    .select()
    .from(userStats)
    .where(eq(userStats.username, username))
    .limit(1);

  if (!existingUser) {
    const followers = await getFollowers({
      username,
    });

    const result = await db
      .insert(userStats)
      .values({
        username,
        fullName: ghUser.name,
        avatarUrl: ghUser.avatar_url,
        followers: followers.map((f) => f.login),
      })
      .returning();

    existingUser = result[0];
  }

  await db.insert(subscriptions).values({
    email,
    username: existingUser.username,
    emailFrequency,
    knownFollowers: existingUser.followers,
    lastEmailSent: new Date(),
  });

  await sendEmail({
    to: email,
    subject: "Subscription Confirmation",
    html: subscriptionConfirmation({
      username,
      emailFrequency,
      email,
    }),
  });

  return new Response("Hello from Vercel!");
}
