"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/constants/keys";
import InventoryTableFilters from "./table-filters";
import Spinner from "@/components/ui/spinner";
import InventoryDataTable from "./data-table";
import { _getProducts } from "@/lib/api/product.api";
import { Button } from "@/components/ui/button";
import TableTabs from "../../table-tabs";
import Link from "next/link";

const InventoryTable = () => {
  const [state, setState] = useState("all");
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const tabs = ["all", "active", "inactive", "draft"];

  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: [QueryKeys.GET_PRODUCTS, page, state],
    queryFn: () =>
      _getProducts(page, 10, {
        status: state === "all" ? "" : state,
        search: searchText,
      }),
    enabled: !!page,
  });

  useEffect(() => setPage(1), [state]);

  const loading = isLoading || isRefetching;

  return (
    <div className="w-full bg-white p-6 flex flex-col space-y-9 rounded-md">
      <InventoryTableFilters
        page={page}
        setPage={setPage}
        itemsPerPage={data?.data.meta.itemsPerPage as number}
        totalItems={data?.data.meta.totalItems as number}
        totalPages={data?.data.meta.totalPages as number}
        isLoading={loading}
        searchText={searchText}
        setSearchText={setSearchText}
        refetch={refetch}
      />

      <div className="flex flex-col w-full">
        <TableTabs state={state} setState={setState} tabs={tabs} />

        {loading && (
          <div className="py-10 flex justify-center">
            <Spinner size={35} />
          </div>
        )}

        {!loading && data && data.data.data.length > 0 && (
          <InventoryDataTable products={data.data.data} page={page} />
        )}

        {!loading && data && data.data.data.length === 0 && (
          <div className="py-20 flex flex-col space-y-2 items-center justify-center">
            <h3 className="capitalize font-medium text-2xl text-center">
              No Products
            </h3>
            <p className="text-muted font-light text-center">
              You currently have no products. Add a <br /> product and manage
              inventory
            </p>
            <Link href="/inventory/add" passHref className="pt-3">
              <Button className="bg-[#1D41E0] text-white">Add Product</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryTable;
