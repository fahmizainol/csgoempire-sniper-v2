"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";

interface Product {
  id: string;
  iconUrl: string;
  marketName: string;
  purchasePrice: number;
  recommendedPrice?: number; // Make optional
}

const products: Product[] = [
  {
    id: "1",
    iconUrl: "/placeholder.svg?height=24&width=24",
    marketName: "Apple Inc.",
    purchasePrice: 150.0,
    recommendedPrice: 145.0,
  },
  {
    id: "2",
    iconUrl: "/placeholder.svg?height=24&width=24",
    marketName: "Microsoft Corp.",
    purchasePrice: 420.0,
    recommendedPrice: 425.0,
  },
  {
    id: "3",
    iconUrl: "/placeholder.svg?height=24&width=24",
    marketName: "Alphabet Inc.",
    purchasePrice: 170.5,
    recommendedPrice: 160.0,
  },
  {
    id: "4",
    iconUrl: "/placeholder.svg?height=24&width=24",
    marketName: "Amazon.com Inc.",
    purchasePrice: 185.75,
    recommendedPrice: 190.0,
  },
  {
    id: "5",
    iconUrl: "/placeholder.svg?height=24&width=24",
    marketName: "Tesla Inc.",
    purchasePrice: 250.0,
    recommendedPrice: 240.0,
  },
];

export default function ProductTable() {
  const [sortColumn, setSortColumn] = useState<keyof Product | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedProducts = useMemo(() => {
    if (!sortColumn) return products;

    return [...products].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  }, [products, sortColumn, sortDirection]);

  const handleSort = (column: keyof Product) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product Data</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Icon</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("marketName")}
              >
                <div className="flex items-center">
                  Market Name
                  {sortColumn === "marketName" && (
                    <ArrowUpDown
                      className={`ml-2 h-4 w-4 ${
                        sortDirection === "desc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("purchasePrice")}
              >
                <div className="flex items-center">
                  Purchase Price
                  {sortColumn === "purchasePrice" && (
                    <ArrowUpDown
                      className={`ml-2 h-4 w-4 ${
                        sortDirection === "desc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("recommendedPrice")} // Sort by recommendedPrice for 'Above Recommended Price'
              >
                <div className="flex items-center justify-end">
                  Above Recommended Price
                  {sortColumn === "recommendedPrice" && (
                    <ArrowUpDown
                      className={`ml-2 h-4 w-4 ${
                        sortDirection === "desc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.map((product) => {
              const priceDifference =
                product.purchasePrice - (product.recommendedPrice || 0);
              const percentageDifference = product.recommendedPrice
                ? (priceDifference / product.recommendedPrice) * 100
                : 0;
              const isAboveRecommended = percentageDifference > 0;

              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.iconUrl || "/placeholder.svg"}
                      width={24}
                      height={24}
                      alt={`${product.marketName} icon`}
                      className="rounded-full"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.marketName}
                  </TableCell>
                  <TableCell>${product.purchasePrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    {isAboveRecommended ? (
                      <span className="text-red-500">
                        {percentageDifference.toFixed(2)}% higher
                      </span>
                    ) : (
                      <span className="text-green-500">
                        {Math.abs(percentageDifference).toFixed(2)}% lower
                      </span>
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
