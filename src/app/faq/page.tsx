"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    question: "What is GHNotify?",
    answer:
      "GHNotify is a service that sends you email notifications when someone follows you on GitHub. It helps you stay updated on your growing network without having to check GitHub manually.",
  },
  {
    question: "How does GHNotify work?",
    answer:
      "GHNotify periodically checks your GitHub profile for new followers and sends you an email notification based on your chosen frequency (hourly, daily, weekly, or monthly).",
  },
  {
    question: "Is GHNotify free to use?",
    answer: "Yes, GHNotify is completely free to use.",
  },
  {
    question: "How do I change my notification frequency?",
    answer:
      "You can change your notification frequency by unsubscribing and then resubscribing with the same GitHub username and email address, but selecting a different frequency option.",
  },
  {
    question: "Is my email address safe?",
    answer:
      "Yes, we only use your email to send you GitHub follower notifications. We don't share your email with any third parties or use it for marketing purposes.",
  },
  {
    question: "How do I unsubscribe?",
    answer:
      "Every notification email includes an unsubscribe link at the bottom. Alternatively, you can visit the unsubscribe page on our website and enter your email address.",
  },
  {
    question: "Why do I need to provide my GitHub username?",
    answer:
      "We need your GitHub username to check for new followers on your profile. GHNotify only tracks public follower information available through the GitHub API.",
  },
  {
    question: "Can I use GHNotify for organizations or repositories?",
    answer:
      "Currently, GHNotify only supports notifications for individual GitHub user accounts. Support for organizations and repositories may be added in future updates.",
  },
  {
    question: "Will I get notified about existing followers?",
    answer:
      "No, GHNotify only sends notifications about new followers after you've subscribed to the service.",
  },
  {
    question: "Does GHNotify require access to my GitHub account?",
    answer:
      "No, GHNotify doesn't require any GitHub authentication or access to your account. We only need your public GitHub username.",
  },
];

export default function FaqPage() {
  return (
    <div className="flex flex-col justify-center items-center p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
        Have questions about GHNotify? Find answers to common questions below.
      </p>
      <div className="w-full">
        <Accordion type="single" collapsible className="w-full">
          {questions.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
