"use client";

import { CheckCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const subscribeSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(1, { message: "Username is required" }),
  emailFrequency: z.enum(["hourly", "daily", "weekly", "monthly"]),
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

export function SubscribeForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: "", username: "", emailFrequency: "daily" },
    mode: "onChange",
  });

  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(true);

  const onSubmit: SubmitHandler<SubscribeFormValues> = async (data) => {
    const res = await fetch(`/api/gh`, {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
      }),
    });

    if (!res.ok) {
      const msg = await res.text();
      setError("username", {
        type: "manual",
        message: msg,
      });
      return;
    } else {
      setLoading(true);
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // const json = await res.json();
      setSuccess(true);
    }

    setLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md w-full mx-auto">
        <SuccessMessage />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <p className="text-sm text-gray-500">Subscribing...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-2 items-center justify-center flex-col w-full"
    >
      <Card className="w-full sm:w-[400px]">
        <CardContent>
          <div>
            <Label htmlFor="email" className="text-sm mb-2">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            <div className="h-9">
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="username" className="text-sm mb-2">
              Github username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter github username"
              {...register("username")}
            />
            <div className="h-9">
              {errors.username && (
                <p className="text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full">
            <Label htmlFor="emailFrequency" className="text-sm mb-2 w-full">
              Update interval
            </Label>
            <Controller
              name="emailFrequency"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="daily" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">hourly</SelectItem>
                    <SelectItem value="daily">daily</SelectItem>
                    <SelectItem value="weekly">weekly</SelectItem>
                    <SelectItem value="monthly">monthly</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <div className="h-9">
              {errors.emailFrequency && (
                <p className="text-xs text-red-500">
                  {errors.emailFrequency.message}
                </p>
              )}
            </div>
          </div>
          <Button
            className="mt-5 w-full"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}

export function SuccessMessage() {
  return (
    <Alert>
      <CheckCircleIcon className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        You will receive an email when someone follows you on Github.
      </AlertDescription>
    </Alert>
  );
}
