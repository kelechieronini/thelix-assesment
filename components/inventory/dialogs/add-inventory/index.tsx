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
import AddProductImage from "@/components/inventory/add-product-image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ProductImageFile } from "@/lib/types/product-image.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/constants/keys";
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
  category: string | undefined;
  page: number;
};

const AddInventory = ({ isOpen, onClose, category, page }: Props) => {
  const [errorResponse, setErrorResponse] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<ProductImageFile[]>([]);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<AddProductSchema>({
    resolver: classValidatorResolver(AddProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: _addProduct,
    onSuccess: () => {
      form.reset();
      setSelectedFiles([]);
      toast({ title: "Product added." });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_PRODUCTS],
      });
      onClose();
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
      setErrorResponse("Please select product image.");
      return;
    }

    const payload = {
      data,
      selectedFiles,
    };

    mutate(payload);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          aria-describedby="reset-success"
          className="md:max-w-[946px] md:max-h-[80vh] max-h-[95vh] max-w-[400px] flex flex-col gap-4 !rounded-2xl overflow-auto products-scrollbar"
        >
          <section className={"w-full"}>
            <Form {...form}>
              <form className="space-y-6 bg-white md:px-8 md:py-10">
                <h4 className="text-muted text-sm">Create New Product</h4>

                <div className="flex items-start md:flex-row flex-col justify-stretch gap-9">
                  <VStack className="space-y-6 md:w-[60%] w-full order-2 md:order-1">
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
                            Name <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Product Name"
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
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">
                            Price <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="1000"
                              className="placeholder:text-muted placeholder:font-light rounded-none"
                              type="number"
                              {...field}
                            />
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
                      name="category"
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
                              <SelectTrigger className="w-full  grow h-12">
                                <SelectValue placeholder="Select Categroy" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Clothes">Clothes</SelectItem>
                                <SelectItem value="Shoes">Shoes</SelectItem>
                                <SelectItem value="Hats">Hats</SelectItem>
                              </SelectContent>
                            </Select>
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

                <div className="w-full flex justify-center items-center">
                  <Button
                    className=" text-white bg-[#1D41E0] hover:bg-[#2b44bf] md:w-[400px] w-[200px]"
                    onClick={form.handleSubmit(publish)}
                    isLoading={isPending}
                    disabled={isPending}
                  >
                    Publish
                  </Button>
                </div>
              </form>
            </Form>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddInventory;
