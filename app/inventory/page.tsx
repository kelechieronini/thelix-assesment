import InventoryStats from "@/components/manager/inventory-stats";
import InventoryData from "@/components/manager/tables/inventory-table";
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
