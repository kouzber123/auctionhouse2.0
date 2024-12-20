"use client";
import { placeBidForAuction } from "@/app/actions/auctionActions";
import { currencyFormatter } from "@/app/helper/numberWithComma";
import { useBidStore } from "@/hooks/useBidStore";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  auctionId: string;
  highBid: number;
};
export default function BidForm({ auctionId, highBid }: Readonly<Props>) {
  const { register, handleSubmit, reset } = useForm();
  const addBid = useBidStore((state) => state.addBid);
  function onSubmit(data: FieldValues) {
    if (data.amount <= highBid) {
      reset();
      return toast.error(
        "Bid must be at least " + currencyFormatter.format(highBid + 1)
      );
    }
    placeBidForAuction(auctionId, +data.amount)
      .then((bid) => {
        if (bid.error) throw bid.error;
        addBid(bid);
        reset();
      })
      .catch((error) => toast.error(error.message));
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center border-2 rounded-lg py-2"
    >
      <input
        type="number"
        {...register("amount")}
        className="input-custom text-sm text-gray-600"
        placeholder={`Enter your bid (minimun bid is ${currencyFormatter.format(
          highBid + 1
        )}`}
      />
    </form>
  );
}
