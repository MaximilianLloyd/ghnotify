import { SubscribeForm } from "./SubscribeForm";
import {
  GitHubLogoIcon,
  EnvelopeOpenIcon,
  BellIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] p-8">
      <div className="flex flex-col justify-center text-center items-center gap-4 mb-12 max-w-2xl mx-auto">
        <div className="p-3 rounded-full bg-black/5 dark:bg-white/5 inline-flex mb-2">
          <BellIcon className="h-6 w-6" />
        </div>
        <p className="text-xl text-primary font-medium">
          Never miss a new GitHub follower again
        </p>
        <p className="text-base text-muted-foreground max-w-lg">
          Get email notifications when someone follows you on GitHub. Choose
          your frequency hourly, daily, weekly, or monthly.
        </p>
      </div>

      <main className="flex flex-col items-center w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          <div className="flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-black/5 dark:bg-white/5 inline-flex">
                  <GitHubLogoIcon className="h-5 w-5" />
                </div>
                <h3 className="tracking-[-0.15px] font-medium">github</h3>
              </div>
              <p className="text-muted-foreground">
                Simply provide your GitHub username. No authentication required.
                We&apos;ll monitor your follower count using the public GitHub
                API.
              </p>

              <div className="flex items-center gap-3 mt-6">
                <div className="p-2 rounded-full bg-black/5 dark:bg-white/5 inline-flex">
                  <EnvelopeOpenIcon className="h-5 w-5" />
                </div>
                <h3 className="font-medium">email</h3>
              </div>
              <p className="text-muted-foreground">
                Choose how often you want to receive notifications. We&apos;ll
                email you with details about your new followers.
              </p>

              <div className="mt-6">
                <Link
                  href="/faq"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <SubscribeForm />
          </div>
        </div>
      </main>
    </div>
  );
}
