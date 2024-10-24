"use client";
import React, { useState } from "react";
import { UpdateAuction } from "../actions/auctionActions";
import { Button } from "flowbite-react";

export default function AuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>();

  function doUpdate() {
    setResult(undefined);
    setLoading(true);
    UpdateAuction()
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
