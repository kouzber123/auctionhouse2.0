import React from "react";
import { currencyFormatter } from "../helper/numberWithComma";

type Props = {
  amount?: number;
  reservePrice: number;
};
export default function CurrentBid({ amount, reservePrice }: Readonly<Props>) {
  const text = amount ? currencyFormatter.format(amount) : "no bids";
  const color = amount
    ? amount > reservePrice
      ? "bg-green-600"
      : "bg-amber-600"
    : "bg-red-600";
  return (
    <div
      className={`
        border-2 border-white text-white px-2 rounded-lg
        flex justify-center ${color}
    `}
    >
      {text}
    </div>
  );
}
