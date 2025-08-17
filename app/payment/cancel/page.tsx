import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const PaymentCancel = () => {
  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center bg-muted/20 px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center space-y-3">
          {/* Icon */}
          <div className="flex items-center justify-center size-20 rounded-full bg-red-500/10">
            <XCircle className="size-12 text-red-500" />
          </div>

          {/* Title */}
          <CardTitle className="text-2xl font-bold text-center">
            Payment Cancelled
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-6 text-center">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            No worries, you won’t be charged. If you’d like, you can try again
            or return to the homepage.
          </p>

          {/* Button */}
          <Link
            href="/"
            className={buttonVariants({
              className:
                "w-full flex justify-center gap-2 rounded-lg py-2",
            })}
          >
            <ArrowLeft className="size-4" />
            Go back to homepage
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCancel;
