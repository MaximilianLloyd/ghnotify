// import { getFollowers } from "@/lib/github/api";
import { SubscribeForm } from "./SubscribeForm";

export default async function Home() {
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
        <p className="flex gap-1">
          Built by
          <a
            href="https://x.com/sudo2hell"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 underline hover:text-black transition-colors"
          >
            Max
          </a>
        </p>
      </footer>
    </div>
  );
}
