import React from "react";
import Image from "next/image";
import { Product } from "@/lib/types/product.type";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex bg-white p-3 rounded-xl h-fit border border-[#F0F2F5] shadow-md flex-col gap-2">
      <div className="h-[185px] relative flex justify-center items-center shadow rounded-2xl w-full">
        <Image
          className="  rounded-2xl cursor-pointer"
          src={product.image}
          layout="fill"
          objectFit="cover"
          alt="preview-image"
        />
      </div>
      <div className="flex flex-col gap-2">
        {product.category === "Men" ? (
          <p className="text-xs py-1 px-2 text-white bg-[#667185] rounded-xl w-fit">
            Men
          </p>
        ) : (
          <p className="text-xs py-1 px-2 text-white bg-[#0F973D] rounded-xl w-fit">
            Women
          </p>
        )}

        <p className="text-lg text-[#101928] font-bold">{product.name}</p>

        <p className="text-sm text-[#101928]">{product.description}</p>

        <p className="text-xl ">
          {product.price == 0 ? "Free" : `₦${product.price.toLocaleString()}`}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
