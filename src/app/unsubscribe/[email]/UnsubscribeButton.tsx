"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function UnsubscribeButton({
  email,
  username,
}: {
  email: string;
  username: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUnsubscribe = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/unsubscribe`, {
        method: "POST",
        body: JSON.stringify({
          email,
          username,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setIsLoading(false);
      } else {
        console.error("Failed to unsubscribe");
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
    }
  };

  return (
    <div>
      {!isLoading && !success && (
        <Button variant="outline" onClick={handleUnsubscribe}>
          Unsubscribe
        </Button>
      )}
      {isLoading && (
        <Button variant="outline" disabled>
          Unsubscribing...
        </Button>
      )}
      {success && (
        <p className="text-sm text-green-500">
          You have successfully unsubscribed from notifications.
        </p>
      )}
    </div>
  );
}
