"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AuctionItemNew } from "@/types";
import { formatTimestamp } from "@/utils";

export default function ItemCard({ item }: { item: AuctionItemNew }) {
  return (
    <Card className="shadow-2xl rounded-2xl p-4">
      <CardContent className="flex flex-col items-center space-y-4">
        <img
          src={`https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}/360fx360f`}
          alt={item.market_name}
          className="w-44 h-44 rounded-lg object-contain"
        />

        <h2 className="text-xl font-semibold text-center">
          {item.market_name}
        </h2>
        <h4>ID: {item.id}</h4>

        <div className="flex flex-col items-center space-y-2">
          <Badge>Ends at: {formatTimestamp(item.auction_ends_at)}</Badge>
          <Badge
            className={cn(
              "text-sm px-2 py-1 rounded-md",
              item.above_recommended_price < 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            )}
          >
            {item.above_recommended_price >= 0
              ? `+${item.above_recommended_price}% above suggested`
              : `${item.above_recommended_price}% below suggested`}
          </Badge>

          <div className="text-muted-foreground text-sm">
            Purchase Price:{" "}
            <span className="text-foreground font-medium">
              ${(item.purchase_price / 100).toFixed(2)}
            </span>
          </div>
          <div className="text-muted-foreground text-sm">
            Number of bids:{" "}
            <span className="text-foreground font-medium">
              {item.auction_number_of_bids}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
