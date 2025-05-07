import { getFollowers } from "@/lib/github/api";
import { SubscribeForm } from "./SubscribeForm";

export default async function Home() {
  const followers = await getFollowers({
    username: "MaximilianLloyd",
    page: 1,
  });

  // await sendEmail({
  //   to: "me@maxlloyd.no",
  //   subject: "New followers",
  //   html: followerNotificationEmail({
  //     recipientEmail: "me@maxlloyd.no",
  //     githubUsername: "MaximilianLloyd",
  //     newFollowers: followers.map((follower) => ({
  //       username: follower.login,
  //       avatarUrl: follower.avatar_url,
  //     })),
  //   }),
  // });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col justify-center text-center items-cneter gap-2">
        <h1 className="text-lg">GHnotify</h1>
        <p>Get notified when someone follows you on Github</p>
      </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <SubscribeForm />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="flex gap-2">
          Built by
          <a
            href="https://github.com/MaximilianLloyd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 underline hover:text-black transition-colors"
          >
            @MaximilianLloyd
          </a>
        </p>
      </footer>
    </div>
  );
}
