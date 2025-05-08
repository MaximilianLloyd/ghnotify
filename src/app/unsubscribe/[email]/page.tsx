import { db, subscriptions } from "@/db";
import { eq } from "drizzle-orm";
import { UnsubscribeButton } from "./UnsubscribeButton";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default async function Unsubscribe({ params }) {
  // get query param
  const { email: toDecode } = params as { email: string };
  const email = decodeURIComponent(toDecode);

  const subs = await db
    .select({
      emailFrequency: subscriptions.emailFrequency,
      id: subscriptions.id,
      email: subscriptions.email,
      username: subscriptions.username,
    })
    .from(subscriptions)
    .where(eq(subscriptions.email, email));

  return (
    <div className="grid min-h-screen p-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] justify-center items-center">
        <div>
          {subs.length > 0 ? (
            <div>
              {subs.map((sub) => (
                <div
                  key={sub.id}
                  className="flex  gap-4 text-center justify-center items-center"
                >
                  <h2 className="text-lg">{sub.username}</h2>
                  <p className="text-sm text-gray-500">
                    {sub.emailFrequency} notifications
                  </p>
                  <UnsubscribeButton
                    email={sub.email}
                    username={sub.username}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 text-center justify-center items-center">
              <h2 className="text-lg">No subscriptions found</h2>
              <p className="text-sm text-gray-500">
                You have no active subscriptions
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
