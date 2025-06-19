import InventoryStats from "@/components/inventory/inventory-stats";
import InventoryData from "@/components/inventory/inventory-data";
import React from "react";

const Inventory = () => {
  return (
    <section className={"p-6 flex flex-col space-y-6"}>
      <InventoryStats />
      <InventoryData />
    </section>
  );
};

export default Inventory;
