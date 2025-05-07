// import { getFollowers } from "@/lib/github/api";
import Image from "next/image";
import { UnsubscribeForm } from "./UnsubscribeForm";

export default async function Unsubscribe() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col justify-center text-center items-cneter gap-2">
        <h1 className="text-lg">GHnotify</h1>
        <p>Get notified when someone follows you on Github</p>
      </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <UnsubscribeForm />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/MaximilianLloyd/ghnotify"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Repo
        </a>
      </footer>
    </div>
  );
}
