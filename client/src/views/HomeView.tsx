import { useState, useMemo, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSkinsStore } from "../stores/useSkinsStores";
import type { AuctionItemNew } from "../types";
import AuctionItemCard from "@/components/AuctionItemCard";
import ItemCard from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { Grid } from "lucide-react";
import SkinsListGrid from "@/components/SkinsListGrid";
import SkinsListTable from "@/components/SkinsListTable";

function HomeView() {
  const skins = useSkinsStore((s) => s.skins);
  const fetchSkins = useSkinsStore((s) => s.fetchSkins);
  const sortBy = useSkinsStore((s) => s.sortBy);
  const setSortBy = useSkinsStore((s) => s.setSortBy);

  const [view, setView] = useState("table");

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

  function onViewButtonClick() {
    if (view == "table") {
      setView("grid");
      return;
    }
    setView("table");
  }

  function renderSkinsView() {
    switch (view) {
      case "grid":
        return SkinsListGrid(sortedSkins);
      case "table":
        return SkinsListTable(sortedSkins);
      default:
        return <div></div>;
    }
  }

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
            <Button onClick={onViewButtonClick} className="mx-2 justify-end">
              <Grid></Grid>
            </Button>
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
        <div>{renderSkinsView()}</div>
      </div>
    </>
  );
}

export default HomeView;
