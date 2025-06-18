"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HStack, VStack } from "@/components/ui/stack";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import AddProductImage from "@/components/manager/add-product-image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ProductImageFile } from "@/lib/types/product-image.type";
import { useQuery, useMutation } from "@tanstack/react-query";
import { _getCategories } from "@/lib/api/category.api";
import { QueryKeys } from "@/lib/constants/keys";
import Spinner from "@/components/ui/spinner";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { AddProductSchema } from "@/lib/schema/add-product.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { _addProduct } from "@/lib/api/product.api";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddInventory = ({ isOpen, onClose }: Props) => {
  const [errorResponse, setErrorResponse] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<ProductImageFile[]>([]);

  const { toast } = useToast();

  const form = useForm<AddProductSchema>({
    resolver: classValidatorResolver(AddProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category_id: "",
      tags: "",
      size: "",
      waist: 0,
      weight: 0,
      length: 0,
      price: 0,
      quantity_in_stock: 0,
    },
  });

  const { isLoading, data } = useQuery({
    queryKey: [QueryKeys.GET_PRODUCT_CATEGORIES],
    queryFn: _getCategories,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: _addProduct,
    onSuccess: () => {
      form.reset();
      setSelectedFiles([]);
      toast({ title: "Product added." });
    },
    onError: (err: any) => {
      if (err?.response?.data) {
        setErrorResponse(err?.response?.data?.message);
      } else {
        setErrorResponse(err.message);
      }
    },
  });

  const publish: SubmitHandler<AddProductSchema> = async (data) => {
    setErrorResponse(null);

    if (selectedFiles.length === 0) {
      setErrorResponse("Please select product images.");
      return;
    }

    const payload = {
      data,
      status: "active",
      selectedFiles,
    };

    mutate(payload);
  };

  const drafts: SubmitHandler<AddProductSchema> = async (data) => {
    setErrorResponse(null);

    if (selectedFiles.length === 0) {
      setErrorResponse("Please select product images.");
      return;
    }

    const payload = {
      data,
      status: "draft",
      selectedFiles,
    };

    mutate(payload);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          aria-describedby="reset-success"
          className="md:max-w-[946px] md:max-h-[80vh] max-h-[60vh] max-w-[400px] flex flex-col gap-4 !rounded-2xl overflow-auto products-scrollbar"
        >
          <section className={"w-full"}>
            <Form {...form}>
              <form className="space-y-6 bg-white md:px-8 md:py-10">
                <h4 className="text-muted text-sm">Add New Product</h4>

                <div className="flex items-stretch md:flex-row flex-col justify-stretch gap-9">
                  <VStack className="space-y-6 md:w-[60%] order-2 md:order-1">
                    <VStack className="space-y-1.5">
                      <h3 className="text-primary font-semibold text-2xl">
                        General Information
                      </h3>
                      <p className="font-light text-sm">
                        <span className="text-destructive">*</span> indicates
                        required information
                      </p>
                    </VStack>

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">
                            Product Name{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g Reclaimed vintage loose men jean"
                              className="placeholder:text-muted placeholder:font-light rounded-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">
                            Category <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                              required
                            >
                              <SelectTrigger className="w-full rounded-none h-12 capitalize">
                                <SelectValue
                                  placeholder="Select category"
                                  className="w-full placeholder:!text-muted placeholder:!font-light !rounded-none"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {isLoading && (
                                  <div className="py-10 flex justify-center">
                                    <Spinner size={35} />
                                  </div>
                                )}

                                {!isLoading &&
                                  data &&
                                  data.data &&
                                  data.data.data.length > 0 &&
                                  data.data.data.map((d, index) => (
                                    <SelectItem
                                      key={index}
                                      value={d.id}
                                      className="capitalize"
                                    >
                                      {d.name}
                                    </SelectItem>
                                  ))}

                                {!isLoading &&
                                  data &&
                                  data.data &&
                                  data.data.data.length === 0 && (
                                    <div className="py-10 flex justify-center">
                                      <p className="text-center font-medium">
                                        No categories.
                                      </p>
                                    </div>
                                  )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">
                            Description{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Product Description"
                              className="placeholder:text-muted placeholder:font-light rounded-none"
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">
                            Product Tags{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e,g Under 5k, Shirt, Men"
                              className="placeholder:text-muted placeholder:font-light rounded-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </VStack>

                  <AddProductImage
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                  />
                </div>

                <Separator className="!my-10" />

                {errorResponse && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorResponse}</AlertDescription>
                  </Alert>
                )}

                <HStack className="justify-center space-x-5">
                  <Button
                    className="bg-inherit border border-primary text-primary hover:text-white w-[150px]"
                    onClick={form.handleSubmit(drafts)}
                    isLoading={isPending}
                    disabled={isPending}
                  >
                    Save as draft
                  </Button>
                  <Button
                    className=" text-white bg-[#1D41E0] hover:bg-[#1D41E0] w-[150px]"
                    onClick={form.handleSubmit(publish)}
                    isLoading={isPending}
                    disabled={isPending}
                  >
                    Publish
                  </Button>
                </HStack>
              </form>
            </Form>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddInventory;
