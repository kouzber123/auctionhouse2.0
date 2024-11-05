"use client";
import React, { useState } from "react";
import { updateAuction } from "../actions/auctionActions";
import { Button } from "flowbite-react";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};
export default function AuthTest({ session }: Readonly<Props>) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>();

  function doUpdate() {
    setResult(undefined);
    setLoading(true);
    updateAuction({}, session?.user.id ?? "")
      .then((res) => setResult(res))
      .catch((err) => setResult(err))
      .finally(() => setLoading(false));
  }
  return (
    <div className="flex items-center gap-4">
      <Button onClick={doUpdate} outline isProcessing={loading}>
        Test auth
      </Button>

      <div>{JSON.stringify(result, null, 2)}</div>
    </div>
  );
}
