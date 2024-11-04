"use client";
import { getBidsForAuction } from "@/app/actions/auctionActions";
import Heading from "@/app/components/Heading";
import { useBidStore } from "@/hooks/useBidStore";
import { Auction, Bid } from "@/types";
import { User } from "next-auth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BidItem from "./BidItem";
import EmptyFilter from "@/app/components/EmptyFilter";
import BidForm from "./BidForm";
import LoginButton from "@/app/nav/LoginButton";
import { currencyFormatter } from "@/app/lib/numberWithComma";

type Props = {
  user: User | null;
  auction: Auction;
};

export default function BidList({ user, auction }: Readonly<Props>) {
  const [loading, setLoading] = useState(true);
  const bids = useBidStore((state) => state.bids);
  const setBids = useBidStore((state) => state.setBids);
  const open = useBidStore((state) => state.open);
  const setOpen = useBidStore((state) => state.setOpen);
  const openForBids = new Date(auction.auctionEnd) > new Date();
  const highBid = bids.reduce(
    (prev, current) =>
      prev > current.amount
        ? prev
        : current.bidStatus.includes("Accepted")
        ? current.amount
        : prev,
    0
  );
  useEffect(() => {
    getBidsForAuction(auction.id)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        if (res.error) throw res.error;
        setBids(res as Bid[]);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, [auction.id, setBids, setLoading]);

  useEffect(() => {
    setOpen(openForBids);
  }, [openForBids, setOpen]);
  if (loading) return <span>Loading...</span>;
  return (
    <div className="rounded-lg shadow-md">
      <div className="py-2 px-4 bg-white">
        <div className="sticky top-0 bg-white p-2">
          <Heading
            title={`Current High bid is ${currencyFormatter.format(highBid)}`}
          />
        </div>
      </div>
      <div className="overflow-auto h-[400px] flex flex-col-reverse px-2">
        {bids.length === 0 ? (
          <EmptyFilter
            title="No Bids for this item"
            subtitle="Please feel free to make a bid"
          />
        ) : (
          <>
            {bids.map((bid) => (
              <BidItem key={bid.id} bid={bid} />
            ))}
          </>
        )}
      </div>
      <div className="px-2 pb-2 text-gray-500">
        <>
          {!open ? (
            <div className="flex p-2 text-lg flex-col gap-2">
              <p className="font-semibold text-center">Auction finished</p>
            </div>
          ) : (
            <>
              {!user ? (
                <div className="flex p-2 text-lg flex-col gap-2">
                  <p className="font-semibold text-center">
                    LOGIN TO PLACE A BID
                  </p>
                  <LoginButton />
                </div>
              ) : user.username === auction.seller ? (
                <div className="flex p-2 text-lg flex-col gap-2">
                  <p className="font-semibold text-center">
                    YOU CANNOT PLACE BIDS ON YOUR OWN AUCTION
                  </p>
                </div>
              ) : (
                <BidForm auctionId={auction.id} highBid={highBid} />
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
}
