import { useState, useMemo, useEffect } from "react";
import ItemCard from "./ItemCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useSkinsStore } from "../stores/useSkinsStores";
import type { AuctionItemNew } from "../types";
import AuctionItemCard from "./AuctionItemCard";

function SkinsListGrid() {
  const skins = useSkinsStore((s) => s.skins);
  const fetchSkins = useSkinsStore((s) => s.fetchSkins);
  const sortBy = useSkinsStore((s) => s.sortBy);
  const setSortBy = useSkinsStore((s) => s.setSortBy);

  const sortedSkins = skins.sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a];
    const bValue = b[sortBy as keyof typeof b];

    const aNum = typeof aValue === "number" ? aValue : Number(aValue) || 0;
    const bNum = typeof bValue === "number" ? bValue : Number(bValue) || 0;

    return bNum - aNum;
  });

  const filteredSkins = skins.filter((a) => {
    return a.auction_ends_at;
  });

  function onAuctionItemsClick() {}

  useEffect(() => {
    fetchSkins();
  }, []);

  return (
    <>
      <div className="m-4 flex flex-col">
        <div className="flex justify-end">
          <div className="mx-2">
            <Button
              onClick={() => setSortBy("auction_ends_at")}
              variant="default"
            >
              Auction items
            </Button>
          </div>
          <div className="mx-2">
            <Button variant="default">All items</Button>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>Sort by</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => setSortBy("auction_number_of_bids")}
                >
                  Last updated
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("id")}>
                  New skins
                </DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {sortedSkins.map((v) =>
            v.auction_ends_at ? (
              <AuctionItemCard item={v} key={v.id} />
            ) : (
              <ItemCard item={v} key={v.id} />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default SkinsListGrid;
