import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VStack } from "@/components/ui/stack";
import { ProductImageFile } from "@/lib/types/product-image.type";
import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState, DragEvent } from "react";

type Props = {
  selectedFiles: ProductImageFile[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<ProductImageFile[]>>;
};

const AddProductImage = ({ selectedFiles, setSelectedFiles }: Props) => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput?.current?.click();
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);

    const newFiles: ProductImageFile[] = droppedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemove = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newFiles: ProductImageFile[] = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  return (
    <div
      className="border border-muted w-[40%] flex flex-col justify-between p-5"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {selectedFiles.length > 0 && (
        <div className="flex items-center justify-start space-x-4 space-y-4 flex-wrap">
          {selectedFiles.map((file, index) => (
            <div key={file.url} className="relative">
              <Image
                src={file.url}
                width={100}
                height={100}
                alt={file.file.name}
                className="object-contain object-center rounded"
              />
              <Button
                className="bg-gray-200 rounded-full text-primary absolute -right-3 -top-3 !w-6 !h-6"
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(index)}
              >
                <X size={15} />
              </Button>
            </div>
          ))}
        </div>
      )}

      <VStack className="items-center h-full justify-center text-center space-y-10">
        <VStack className="space-y-1">
          <h3 className="text-primary font-medium text-2xl">Add Image</h3>
          <p className="text-sm font-light text-muted">
            You can upload up to 5 images here
          </p>
        </VStack>

        <VStack className="space-y-1">
          <div className="flex items-center space-x-0.5">
            <Button
              type="button"
              className="rounded-none text-white bg-[#1D41E0] hover:bg-[#1D41E0]"
              onClick={handleClick}
            >
              Upload Images
            </Button>
            <Input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={fileInput}
              onChange={handleFileChange}
            />
            <Button
              type="button"
              className="rounded-none text-white bg-[#1D41E0] hover:bg-[#1D41E0]"
              onClick={handleClick}
            >
              <ChevronDown />
            </Button>
          </div>
          <p className="text-sm font-light text-muted">or drag and drop</p>
        </VStack>
      </VStack>
    </div>
  );
};

export default AddProductImage;
