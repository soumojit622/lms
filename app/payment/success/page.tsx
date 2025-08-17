"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConfetti } from "@/hooks/use-confetti";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

const PaymentSuccessful = () => {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    triggerConfetti();
  }, [triggerConfetti]);

  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center bg-muted/20 px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center space-y-3">
          {/* Icon */}
          <div className="flex items-center justify-center size-20 rounded-full bg-green-500/10">
            <CheckCircle2 className="size-12 text-green-600" />
          </div>

          {/* Title */}
          <CardTitle className="text-2xl font-bold text-center">
            Payment Successful
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-6 text-center">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            🎉 Congratulations! Your payment was processed successfully. You now
            have full access to your course.
          </p>

          {/* Button */}
          <Link
            href="/dashboard"
            className={buttonVariants({
              className: "w-full flex justify-center gap-2 rounded-lg py-2",
            })}
          >
            Go to Dashboard
            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessful;
