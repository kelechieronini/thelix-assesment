"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/constants/keys";
import InventoryFilters from "./inventory-filters";
import Spinner from "@/components/ui/spinner";
import ProductCard from "../product-card";
import { _getProducts } from "@/lib/api/product.api";
import { useProductStore } from "@/store/product";

const InventoryData = () => {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const setProducts = useProductStore((state) => state.setProducts);
  const products = useProductStore((state) => state.products);

  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: [QueryKeys.GET_PRODUCTS, page, category],
    queryFn: () =>
      _getProducts(page, 4, {
        category: category === "All" ? "" : category,
        name: searchText,
      }),
    enabled: !!page,
  });

  useEffect(() => setPage(1), [category]);

  useEffect(() => {
    if (Array.isArray(data?.data)) {
      setProducts(data.data);
    } else {
      setProducts([]); // fallback to empty array
    }
  }, [data, setProducts]);

  const loading = isLoading || isRefetching;

  return (
    <div className="w-full bg-white p-6 flex flex-col space-y-4 rounded-md">
      <h2 className="text-muted font-bold text-[10px]">
        NB: Max. total Items per page: 6
      </h2>
      <div className="flex flex-col space-y-9">
        <InventoryFilters
          page={page}
          setPage={setPage}
          itemsPerPage={6}
          totalItems={products.length}
          totalPages={3}
          isLoading={loading}
          searchText={searchText}
          setSearchText={setSearchText}
          refetch={refetch}
          category={category}
          setCategory={setCategory}
        />

        <div className="flex flex-col w-full">
          {loading && (
            <div className="py-10 flex justify-center">
              <Spinner size={35} />
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
              {/* Reverse the products array to display the latest products first because the mock api is not handling it well*/}
              {[...products].reverse().map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="py-20 flex flex-col space-y-2 items-center justify-center">
              <h3 className="capitalize font-medium text-2xl text-center">
                No Products
              </h3>
              <p className="text-muted font-light text-center md:text-sm text-xs">
                You currently have no product found. Add a <br /> product and
                manage inventory
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryData;
