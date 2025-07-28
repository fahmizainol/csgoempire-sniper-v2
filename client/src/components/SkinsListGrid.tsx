import ItemCard from "./ItemCard";

import type { AuctionItemNew } from "../types";
import AuctionItemCard from "./AuctionItemCard";

function SkinsListGrid(sortedSkins: AuctionItemNew[]) {
  return (
    <>
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {sortedSkins.map((v) =>
          v.auction_ends_at ? (
            <AuctionItemCard item={v} key={v.id} />
          ) : (
            <ItemCard item={v} key={v.id} />
          )
        )}
      </div>
    </>
  );
}

export default SkinsListGrid;
