import type { AuctionItemNew } from "@/types";
import { create } from "zustand";
import { io } from "socket.io-client";
import auctionData from "@/data/auction_item.json";

// const useSkinsStore = create<{
//   skins: AuctionItemNew[];
//   setSkins: (skins: AuctionItemNew[]) => void;
// }>((set) => ({
//   skins: [],
// }));

interface SkinsStore {
  skins: AuctionItemNew[];
  isLoading: boolean;
  fetchSkins: () => Promise<void>;
  search: string;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  filterBy: string;
  setFilterBy: (sortBy: string) => void;
  setSearch: (query: string) => void;
}

export const useSkinsStore = create<SkinsStore>((set) => ({
  skins: auctionData as AuctionItemNew[],
  isLoading: false,
  search: "",
  sortBy: "",
  filterBy: "",

  fetchSkins: async () => {
    set({ isLoading: true });
    try {
      const socket = io("http://localhost:3000");

      socket.on("new_bidding_items", (items: AuctionItemNew[]) => {
        set({ skins: items, isLoading: false });
      });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },
  setSearch: (query: string) => set({ search: query }),
  setSortBy: (sortBy: string) => set({ sortBy: sortBy }),
  setFilterBy: (filterBy: string) => set({ filterBy: filterBy }),
}));
