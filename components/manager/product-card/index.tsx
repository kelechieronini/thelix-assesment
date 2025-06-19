import React from "react";
import Image from "next/image";
import { Product } from "@/lib/types/product.type";

const categoryColors: Record<string, string> = {
  Shoes: "bg-indigo-100 text-indigo-700",
  Hats: "bg-amber-100 text-amber-700",
  Clothes: "bg-emerald-100 text-emerald-700",
};

const ProductCard = ({ product }: { product: Product }) => {
  const categoryClass =
    categoryColors[product.category] || "bg-gray-100 text-gray-700";

  return (
    <div className="flex bg-white p-3 rounded-xl h-fit border border-[#F0F2F5] shadow-md flex-col gap-2">
      <div className="h-[185px] relative flex justify-center items-center shadow rounded-2xl w-full">
        <Image
          className="rounded-2xl cursor-pointer object-cover"
          src={product.image}
          layout="fill"
          alt="preview-image"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p
          className={`text-xs py-1 px-2 rounded-xl w-fit font-medium ${categoryClass}`}
        >
          {product.category}
        </p>

        <p className="text-lg text-[#101928] font-bold">{product.name}</p>

        <p className="text-sm text-[#101928]">{product.description}</p>

        <p className="text-xl">
          {product.price === 0 ? "Free" : `₦${product.price.toLocaleString()}`}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
