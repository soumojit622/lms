import { Suspense } from "react";
import VerifyRequest from "./VerifyRequest";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyRequest />
    </Suspense>
  );
}
