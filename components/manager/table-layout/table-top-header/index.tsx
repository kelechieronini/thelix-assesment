import React from "react";
import { HStack } from "@/components/ui/stack";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, EllipsisVertical, RefreshCw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TableTopHeader = () => {
  return (
    <HStack className={"items-center justify-between"}>
      <HStack className={"items-center space-x-5"}>
        <Input
          className={"min-w-[20rem]"}
          placeholder={"Search"}
          type={"text"}
        />
        <Button size={"icon"} variant={"link"}>
          <RefreshCw size={22} />
        </Button>

        <HStack className={"items-center space-x-1"}>
          <Checkbox />
          <ChevronDown size={22} />
        </HStack>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        <Button size={"icon"} variant={"link"}>
          <EllipsisVertical />
        </Button>
      </HStack>
      <HStack></HStack>
    </HStack>
  );
};

export default TableTopHeader;
