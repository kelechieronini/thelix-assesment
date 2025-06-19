import React from "react";
import { HStack } from "@/components/ui/stack";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, SearchIcon, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/core/pagination";
import { FilterProps } from "@/lib/types/pagination.type";
import { useDisclosure } from "@/lib/hooks/use-disclosure";
import AddInventory from "@/components/inventory/dialogs/add-inventory";

const InventoryFilters = ({
  page,
  setPage,
  itemsPerPage,
  totalItems,
  totalPages,
  isLoading,
  searchText,
  setSearchText,
  refetch,
  category,
  setCategory,
}: FilterProps) => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    page === 1 ? refetch && refetch() : setPage(1);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchText && setSearchText(e.target.value);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack
      className={"items-center justify-between md:flex-row flex-col gap-3"}
    >
      <HStack className={"items-center md:gap-5 md:flex-row flex-col gap-3"}>
        <form
          className="relative w-full flex items-center"
          onSubmit={handleSubmit}
        >
          <SearchIcon
            className="absolute left-3 z-10 cursor-pointer"
            size={19}
          />
          <Input
            className="md:min-w-[25rem] min-w-[20rem] pl-10 pr-10 placeholder:font-light"
            placeholder="Search product name"
            type="text"
            value={searchText}
            onChange={handleChange}
          />
          <SlidersHorizontal
            className="absolute right-3 z-10 cursor-pointer"
            size={19}
          />
        </form>

        <HStack className="ms-0 gap-2 mt-0 w-full justify-between items-center">
          <Button
            size={"icon"}
            variant={"link"}
            onClick={() => refetch && refetch()}
            className="order-2 md:order-1"
          >
            <RefreshCw size={22} />
          </Button>

          <Select
            value={category}
            onValueChange={(value) => setCategory && setCategory(value)}
          >
            <SelectTrigger className="w-[180px] text-black grow h-12">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Clothes">Clothes</SelectItem>
              <SelectItem value="Shoes">Shoes</SelectItem>
              <SelectItem value="Hats">Hats</SelectItem>
            </SelectContent>
          </Select>
        </HStack>
      </HStack>

      <HStack className="gap-5 md:flex-row flex-col items-center">
        <p className="text-sm text-muted">Total Items: {totalItems}</p>
        <div className="order-2 md:order-1">
          <Pagination
            page={page}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            totalPages={totalPages}
            isLoading={isLoading}
          />
        </div>
        <Button
          className="bg-inherit border border-[#1D41E0] text-[#1D41E0] hover:bg-[#1D41E0] hover:text-white order-1 md:order-2"
          onClick={onOpen}
        >
          Create Product
        </Button>
      </HStack>

      <AddInventory
        isOpen={isOpen}
        onClose={onClose}
        page={page}
        category={category}
      />
    </HStack>
  );
};

export default InventoryFilters;
