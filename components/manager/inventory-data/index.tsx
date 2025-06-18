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
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const setProducts = useProductStore((state) => state.setProducts);
  const products = useProductStore((state) => state.products);

  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: [QueryKeys.GET_PRODUCTS, page, category, searchText],
    queryFn: () =>
      _getProducts(page, 10, {
        category: category === "" ? "" : category,
        name: searchText,
      }),
    enabled: !!page,
  });

  useEffect(() => setPage(1), [category]);

  useEffect(() => {
    if (data?.data) {
      setProducts(data.data);
    }
  }, [data, setProducts]);

  const loading = isLoading || isRefetching;

  return (
    <div className="w-full bg-white p-6 flex flex-col space-y-9 rounded-md">
      <InventoryFilters
        page={page}
        setPage={setPage}
        itemsPerPage={10}
        totalItems={30}
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
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="py-20 flex flex-col space-y-2 items-center justify-center">
            <h3 className="capitalize font-medium text-2xl text-center">
              No Products
            </h3>
            <p className="text-muted font-light text-center">
              You currently have no products. Add a <br /> product and manage
              inventory
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryData;
