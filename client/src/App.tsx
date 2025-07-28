import { useState, useMemo } from "react";
import { io } from "socket.io-client";
import type { AuctionItemNew } from "./types";
import ItemCard from "./components/ItemCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./components/ui/button";

function App() {
  const [skins, setSkins] = useState<AuctionItemNew[]>([]);

  try {
    const socket = io("http://localhost:3000");

    socket.on("new_bidding_items", (items: AuctionItemNew[]) => {
      console.log(items);
      items = items.sort((a, b) => {
        return b.auction_number_of_bids - a.auction_number_of_bids;
      });
      setSkins(items);
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <div className="m-4 flex flex-col">
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>Sort by</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Last updated</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {skins.map((v, i) => (
            <ItemCard item={v} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
