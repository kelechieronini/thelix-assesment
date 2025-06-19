import InventoryStats from "@/components/inventory/inventory-stats";
import InventoryData from "@/components/inventory/inventory-data";
import React from "react";

const Inventory = () => {
  return (
    <section className={"md:p-6 p-4 flex flex-col space-y-6"}>
      <InventoryStats />
      <InventoryData />
    </section>
  );
};

export default Inventory;
