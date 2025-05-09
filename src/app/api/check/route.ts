import {
  db,
  userStats as userStatsTable,
  subscriptions as subscriptionsTable,
  Subscription,
} from "@/db";
import { NextRequest } from "next/server";
import { eq, and } from "drizzle-orm";
import { followerNotificationEmail } from "@/lib/email/email";
import { sendEmail } from "@/lib/email/resend";

export async function GET(request: NextRequest) {
  const emailFrequency = request.nextUrl.searchParams.get("emailFrequency");

  if (!emailFrequency) {
    return new Response("Email frequency is required", { status: 400 });
  }

  try {
    // Get all active subscriptions with the matching email frequency
    const activeSubscriptions = await db
      .select({
        id: subscriptionsTable.id,
        email: subscriptionsTable.email,
        username: subscriptionsTable.username,
        knownFollowers: subscriptionsTable.knownFollowers,
        lastEmailSent: subscriptionsTable.lastEmailSent,
      })
      .from(subscriptionsTable)
      .where(
        and(
          eq(
            subscriptionsTable.emailFrequency,
            emailFrequency as Subscription["emailFrequency"],
          ),
          eq(subscriptionsTable.isActive, true),
        ),
      );

    if (activeSubscriptions.length === 0) {
      return new Response(`No active ${emailFrequency} subscriptions found`, {
        status: 200,
      });
    }

    const results = await Promise.all(
      activeSubscriptions.map(async (subscription) => {
        // Get user details
        const user = await db
          .select()
          .from(userStatsTable)
          .where(eq(userStatsTable.username, subscription.username))
          .then((results) => results[0]);

        if (!user) {
          return {
            subscriptionId: subscription.id,
            email: subscription.email,
            error: "User not found",
          };
        }

        // Get previously known followers for this subscription
        const knownFollowers = subscription.knownFollowers || [];

        // Find new followers since last email
        const knownFollowerSet = new Set(knownFollowers);
        const newFollowers = user.followers.filter(
          (f) => !knownFollowerSet.has(f),
        );

        if (newFollowers.length > 0) {
          const emailHtml = followerNotificationEmail({
            recipientEmail: subscription.email,
            githubUsername: user.username,
            followers: newFollowers,
            totalFollowers: user.followers.length,
          });

          await sendEmail({
            to: subscription.email,
            subject: `${user.username} has ${newFollowers.length} new follower${newFollowers.length > 1 ? "s" : ""}!`,
            html: emailHtml,
          });

          // Update subscription with current followers and timestamp
          await db
            .update(subscriptionsTable)
            .set({
              knownFollowers: user.followers,
              lastEmailSent: new Date(),
            })
            .where(eq(subscriptionsTable.id, subscription.id));

          return {
            subscriptionId: subscription.id,
            email: subscription.email,
            username: user.username,
            newFollowersCount: newFollowers.length,
            emailSent: true,
          };
        }

        return {
          subscriptionId: subscription.id,
          email: subscription.email,
          username: user.username,
          newFollowersCount: 0,
          emailSent: false,
        };
      }),
    );

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing follower notifications:", error);
    return new Response(`Error processing follower notifications: ${error}`, {
      status: 500,
    });
  }
}
