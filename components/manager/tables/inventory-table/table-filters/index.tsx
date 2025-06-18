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
import Pagination from "@/components/manager/pagination";
import { FilterProps } from "@/lib/types/pagination.type";
import Link from "next/link";
import { useDisclosure } from "@/lib/hooks/use-disclosure";
import AddInventory from "@/components/manager/dialogs/add-inventory";

const InventoryTableFilters = ({
  page,
  setPage,
  itemsPerPage,
  totalItems,
  totalPages,
  isLoading,
  searchText,
  setSearchText,
  refetch,
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
    <HStack className={"items-center justify-between"}>
      <HStack className={"items-center space-x-5"}>
        <form
          className="relative w-full flex items-center"
          onSubmit={handleSubmit}
        >
          <SearchIcon
            className="absolute left-3 z-10 cursor-pointer"
            size={19}
          />
          <Input
            className="min-w-[25rem] pl-10 pr-10 placeholder:font-light"
            placeholder="Search"
            type="text"
            value={searchText}
            onChange={handleChange}
          />
          <SlidersHorizontal
            className="absolute right-3 z-10 cursor-pointer"
            size={19}
          />
        </form>

        <Button
          size={"icon"}
          variant={"link"}
          onClick={() => refetch && refetch()}
        >
          <RefreshCw size={22} />
        </Button>

        <Select>
          <SelectTrigger className="w-[180px] text-black border-black">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </HStack>

      <HStack className="space-x-5">
        <Pagination
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          totalPages={totalPages}
          isLoading={isLoading}
        />
        {/* <Link href="/inventory/add" passHref> */}
        <Button
          className="bg-inherit border border-[#1D41E0] text-[#1D41E0] hover:bg-[#1D41E0] hover:text-white"
          onClick={onOpen}
        >
          Add Productss
        </Button>
        {/* </Link> */}
      </HStack>

      <AddInventory isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};

export default InventoryTableFilters;
