"use client";
import InventoryStatsCard from "@/components/inventory/inventory-stats-card";
import { useQuery } from "@tanstack/react-query";
import { _getProducts } from "@/lib/api/product.api";
import React from "react";
import { QueryKeys } from "@/lib/constants/keys";

const InventoryStats = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.GET_PRODUCTS],
    queryFn: () => _getProducts(1, 1000, {}),
  });

  const allProducts = data?.data || [];

  const getCountByCategory = (category: string) =>
    allProducts.filter((product) => product.category === category).length;

  return (
    <div className="w-full grid md:grid-cols-3 md:gap-x-6  grid-cols-1 gap-y-4">
      <InventoryStatsCard
        title="Clothes"
        amount={getCountByCategory("Clothes")}
        isLoading={isLoading}
      />
      <InventoryStatsCard
        title="Shoes"
        amount={getCountByCategory("Shoes")}
        isLoading={isLoading}
      />
      <InventoryStatsCard
        title="Hats"
        amount={getCountByCategory("Hats")}
        isLoading={isLoading}
      />
    </div>
  );
};

export default InventoryStats;
