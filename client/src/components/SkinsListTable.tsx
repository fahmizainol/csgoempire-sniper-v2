"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import type { AuctionItemNew } from "@/types";

export default function SkinsListTable(sortedSkins: AuctionItemNew[]) {
  return (
    <div className="w-full  mx-auto p-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Icon</TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">Market Name</div>
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">Purchase Price</div>
              </TableHead>
              <TableHead className="text-right cursor-pointer hover:bg-gray-100">
                <div className="flex items-center justify-end">
                  Above Recommended Price
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSkins.map((v) => {
              return (
                <TableRow key={v.id}>
                  <TableCell>
                    <img
                      src={`https://steamcommunity-a.akamaihd.net/economy/image/${v.icon_url}/360fx360f`}
                      width={100}
                      height={100}
                      alt={`${v.market_name} icon`}
                      className="rounded-full"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{v.market_name}</TableCell>
                  <TableCell>${(v.purchase_price / 100).toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    {v.above_recommended_price >= 0 ? (
                      <span className="text-red-500">{`${v.above_recommended_price}% below suggested`}</span>
                    ) : (
                      <span className="text-green-500">{`${v.above_recommended_price}% above suggested`}</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
