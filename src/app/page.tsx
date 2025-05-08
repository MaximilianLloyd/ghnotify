import { SubscribeForm } from "./SubscribeForm";

export default async function Home() {
  return (
    <div className="flex flex-col justify-items-center p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col justify-center text-center items-cneter gap-2 mb-8">
        <h1 className="text-lg">GHnotify</h1>
        <p>Get notified when someone follows you on Github</p>
      </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <SubscribeForm />
      </main>
    </div>
  );
}
