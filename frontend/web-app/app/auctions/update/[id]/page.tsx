import Heading from "@/app/components/Heading";
import React from "react";
import AuctionForm from "../../AuctionForm";
import { getDetailedViewData } from "@/app/actions/auctionActions";

export default async function Update({ params }: { params: { id: string } }) {
  const data = await getDetailedViewData(params.id);
  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 rounded-lg bg-white">
      <Heading
        title="Update your auction"
        subtitle="Please update details of your car"
      />

      <AuctionForm auction={data} />
    </div>
  );
}
