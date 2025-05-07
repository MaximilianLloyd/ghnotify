import {
  db,
  userStats as userStatsTable,
  subscriptions as subscriptionsTable,
  Subscription,
} from "@/db";
import { NextRequest } from "next/server";
import { eq, and } from "drizzle-orm";
import { getFollowers } from "@/lib/github/api";
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
        userId: subscriptionsTable.userId,
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
          .where(eq(userStatsTable.id, subscription.userId))
          .then((results) => results[0]);

        if (!user) {
          return {
            subscriptionId: subscription.id,
            email: subscription.email,
            error: "User not found",
          };
        }

        // Get current followers from GitHub (just the first page)
        const followers = await getFollowers({
          username: user.username,
        });

        // Convert GitHub format to our stored format
        const currentFollowers = followers.map((f) => ({
          login: f.login,
          avatar_url: f.avatar_url,
          html_url: f.html_url,
        }));

        // Get previously known followers for this subscription
        const knownFollowers = subscription.knownFollowers || [];

        // Find new followers since last email
        const knownFollowerSet = new Set(knownFollowers);
        const newFollowers = currentFollowers.filter(
          (f) => !knownFollowerSet.has(f.login),
        );

        if (newFollowers.length > 0) {
          // Send email notification
          const simpleFollowers = newFollowers.map((f) => ({
            username: f.login,
            avatarUrl: f.avatar_url,
          }));

          const emailHtml = followerNotificationEmail({
            recipientEmail: subscription.email,
            githubUsername: user.username,
            newFollowers: simpleFollowers,
            totalFollowers: currentFollowers.length,
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
              knownFollowers: currentFollowers.map((f) => f.login),
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
