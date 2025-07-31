"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";

const VerifyRequest = () => {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") as string;

  const [otp, setOtp] = useState("");
  const [emailPending, startTransition] = useTransition();

  const isOtpCompleted = otp.length === 6;

  const verifyOtp = () => {
    startTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Your email has been successfully verified.");
            router.push("/");
          },
          onError: () => {
            toast.error("Invalid or expired code. Please try again.");
          },
        },
      });
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto border border-border shadow-md rounded-xl bg-background">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-foreground">
          Verify Your Email
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          We’ve sent a 6-digit verification code to{" "}
          <span className="font-medium text-primary">{email}</span>. Enter it
          below to continue.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-2">
          <InputOTP
            maxLength={6}
            className="gap-2"
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-xs text-muted-foreground">
            Didn’t receive it? Check spam or try again.
          </p>
        </div>

        <Button
          className="w-full text-sm font-medium"
          onClick={verifyOtp}
          disabled={emailPending || !isOtpCompleted}
        >
          {emailPending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            "Verify & Continue"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerifyRequest;
