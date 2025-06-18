import InventoryStatsCard from "@/components/manager/inventory-stats-card";
import React from "react";

const InventoryStats = () => {
  return (
    <div className="w-full grid md:grid-cols-3 md:gap-x-6  grid-cols-1 gap-y-4">
      <InventoryStatsCard title="total products" amount={1659} />
      <InventoryStatsCard title="active" amount={120} />
      <InventoryStatsCard title="drafts" amount={56} />
    </div>
  );
};

export default InventoryStats;
