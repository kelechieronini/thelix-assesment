"use client";

import React, { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { HStack, VStack } from "@/components/ui/stack";
import { Bell, ChevronDown, Menu, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "../hamburger-menu";

const Topbar = () => {
  const pathname = usePathname();
  const computePathname = useCallback(() => {
    if (pathname.includes("/inventory")) {
      return "Inventory";
    } else {
      return "Overview";
    }
  }, [pathname]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header
      className={
        "md:bg-[white] md:text-black bg-[#02071d] text-white md:py-3 py-4 px-5 flex items-center justify-between"
      }
    >
      <h3 className={"h3"}>{computePathname()}</h3>
      <HStack className={"items-center space-x-5 md:flex hidden"}>
        <HStack className={"items-center space-x-1"}>
          <span>Help & Support</span>
          <ChevronDown />
        </HStack>

        <Button size={"icon"} variant={"ghost"}>
          <Bell />
        </Button>

        {/* {isLoading && <Spinner />} */}

        <HStack className={"items-center space-x-3"}>
          <div className={"p-2 border rounded-lg"}>
            <UserRound />
          </div>

          <VStack>
            <span>Kelechi Eronini</span>
            <span className={"font-light text-xs"}>ID: 12345</span>
          </VStack>
          <ChevronDown />
        </HStack>
      </HStack>
      <div className="md:hidden">
        <Menu onClick={() => setIsSheetOpen(!isSheetOpen)} />
        <HamburgerMenu
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
        />
      </div>{" "}
    </header>
  );
};

export default Topbar;
