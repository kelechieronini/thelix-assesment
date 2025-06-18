"use client";

import { Button } from "@/components/ui/button";
import { HStack, VStack } from "@/components/ui/stack";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/constants/keys";
import { _deleteProduct, _getProduct } from "@/lib/api/product.api";
import Spinner from "@/components/ui/spinner";
import { useDisclosure } from "@/lib/hooks/use-disclosure";
import ChangeProductStatus from "@/components/manager/dialogs/change-product-status";

type Props = {
  params: {
    product: string;
  };
};

const Product = ({ params: { product } }: Props) => {
  const { isLoading, data } = useQuery({
    queryKey: [QueryKeys.GET_SINGLE_PRODUCT, product],
    queryFn: () => _getProduct(product),
    enabled: !!product,
  });

  const activeDialog = useDisclosure();
  const inactiveDialog = useDisclosure();
  const draftDialog = useDisclosure();

  return (
    <section className={"p-6 flex flex-col space-y-6"}>
      <VStack className="bg-white px-7 pt-7 pb-16 space-y-7">
        <HStack className="justify-between items-start">
          <h4 className="text-muted text-sm">Product Details</h4>
        </HStack>

        {!isLoading && data && data.data && (
          <div className="flex space-x-6 items-stretch justify-stretch w-full">
            <VStack className="space-y-5">
              {data.data.images.length > 0 &&
                data.data.images.map((img, index) => (
                  <Image
                    src={img}
                    alt={`image-${index + 1}`}
                    height={80}
                    width={80}
                    className="object-cover rounded-lg"
                    key={index}
                  />
                ))}
            </VStack>

            <div
              className="border border-muted w-[30%] max-h-[400px]"
              style={{
                backgroundImage: `url(${data.data.image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>

            <VStack className="space-y-4 w-[70%]">
              <p className="text-muted text-sm">
                {data.data.id.split("-")[0].toUpperCase()}
              </p>

              <VStack className="space-y-1">
                <h3 className="text-primary font-semibold text-lg capitalize">
                  {data.data.name}
                </h3>
                <p className="text-sm text-muted font-light leading-6">
                  {data.data.description}
                </p>
              </VStack>

              <VStack className="space-y-1">
                <h3 className="text-primary font-semibold text-lg">Category</h3>
                <p className="text-sm text-muted font-light capitalize">
                  {data.data.category.name}
                </p>
              </VStack>

              <VStack className="space-y-1">
                <h3 className="text-primary font-semibold text-lg">
                  Measurement
                </h3>
                <div className="grid grid-cols-2 w-3/6 gap-y-1.5">
                  <div className="grid grid-cols-2 gap-x-2">
                    <p className="text-sm text-muted font-light">Waist:</p>
                    <p className="text-sm text-primary font-light uppercase">
                      {data.data.waist === 0 ? "N/A" : data.data.waist}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2">
                    <p className="text-sm text-muted font-light">Size:</p>
                    <p className="text-sm text-primary font-light uppercase">
                      {data.data.size}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2">
                    <p className="text-sm text-muted font-light">Length:</p>
                    <p className="text-sm text-primary font-light uppercase">
                      {data.data.length === 0 ? "N/A" : data.data.length}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2">
                    <p className="text-sm text-muted font-light">Weight:</p>
                    <p className="text-sm text-primary font-light uppercase">
                      {data.data.weight === 0 ? "N/A" : `${data.data.weight}kg`}
                    </p>
                  </div>
                </div>
              </VStack>

              <VStack className="space-y-1">
                <h3 className="text-primary font-semibold text-lg">
                  Sales Information
                </h3>
                <div className="grid grid-cols-1 w-2/5 gap-y-1.5">
                  <div className="grid grid-cols-2">
                    <p className="text-sm text-muted font-light">Price:</p>
                    <p className="text-sm text-primary font-light uppercase">
                      ₦{Number(data.data.price).toLocaleString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="text-sm text-muted font-light">
                      Stock Level:
                    </p>
                    <p className="text-sm text-primary font-light uppercase">
                      {Number(data.data.quantity_in_stock).toLocaleString()}
                    </p>
                  </div>
                </div>
              </VStack>
            </VStack>
          </div>
        )}

        {!isLoading && data && data.data && (
          <HStack className="w-full items-center justify-center space-x-8 pt-9">
            {/* <Button
              className="border-2 border-destructive text-destructive bg-inherit hover:bg-destructive hover:text-white"
            >
              Delete Product
            </Button> */}
            {data.data.status !== "inactive" && (
              <Button
                className="bg-inherit text-primary border-2 border-primary hover:bg-primary hover:text-white"
                onClick={inactiveDialog.onOpen}
              >
                Make inactive
              </Button>
            )}
            {data.data.status !== "draft" && (
              <Button
                className="bg-inherit text-primary border-2 border-primary hover:bg-primary hover:text-white"
                onClick={draftDialog.onOpen}
              >
                Move to drafts
              </Button>
            )}
            {data.data.status !== "active" && (
              <Button
                className="bg-inherit border-2 border-[#1D41E0] text-[#1D41E0] hover:bg-[#1D41E0] hover:text-white"
                onClick={activeDialog.onOpen}
              >
                Make active
              </Button>
            )}
          </HStack>
        )}

        {isLoading && (
          <div className="py-20 flex justify-center">
            <Spinner size={35} />
          </div>
        )}

        {!isLoading && !data && (
          <div className="py-20 flex justify-center">
            <h3 className="text-center font-semibold text-lg text-primary">
              Product not found.
            </h3>
          </div>
        )}
      </VStack>

      <ChangeProductStatus
        isOpen={activeDialog.isOpen}
        onClose={activeDialog.onClose}
        productID={product}
        status="active"
        title="Make Product Active"
        query="Are you sure you want to make product active"
      />

      <ChangeProductStatus
        isOpen={inactiveDialog.isOpen}
        onClose={inactiveDialog.onClose}
        productID={product}
        status="inactive"
        title="Make Product Inactive"
        query="Are you sure you want to make product inactive"
      />

      <ChangeProductStatus
        isOpen={draftDialog.isOpen}
        onClose={draftDialog.onClose}
        productID={product}
        status="draft"
        title="Move to drafts"
        query="Are you sure you want to move product to drafts"
      />
    </section>
  );
};

export default Product;
