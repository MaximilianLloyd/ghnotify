import { db, subscriptions, userStats } from "@/db";
import { sendEmail } from "@/lib/email/resend";
import { subscriptionConfirmation } from "@/lib/email/email";
import { getUser } from "@/lib/github/api";
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

  const [existingUser] = await db
    .select()
    .from(userStats)
    .where(eq(userStats.username, username))
    .limit(1);

  let userId = existingUser?.id;

  if (!existingUser) {
    const result = await db
      .insert(userStats)
      .values({
        username,
        fullName: ghUser.name,
        avatarUrl: ghUser.avatar_url,
      })
      .returning();

    userId = result[0].id;
  }

  await db.insert(subscriptions).values({
    email,
    userId: userId,
    emailFrequency,
  });

  await sendEmail({
    to: email,
    subject: "Subscription Confirmation",
    html: subscriptionConfirmation({
      username,
      emailFrequency,
    }),
  });

  return new Response("Hello from Vercel!");
}
