"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import { HStack, VStack } from "@/components/ui/stack";
import Image from "next/image";
import { LogOut, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { links } from "@/lib/constants/dashboard-links";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const HamburgerMenu = ({ isOpen, onClose }: Props) => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const logout = () => {
    replace("/");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className=" w-full overflow-y-auto">
        <VStack className={"space-y-5 bg-primary text-white p-7 pt-10 h-full"}>
          <HStack className="justify-between items-center">
            <Image
              src={
                "https://thelixholdings.com/wp-content/uploads/2024/09/tmh_white-1-e1727334009858-150x55.png"
              }
              width={80}
              height={50}
              alt={"thelix holdings"}
            />

            <VStack className="text-xs text-muted text-end">
              <span>Kelechi Eronini</span>
              <span className={"font-light text-xs"}>ID: 12345</span>
            </VStack>
          </HStack>

          <VStack className={"mt-5 grow justify-between"}>
            <VStack className={"space-y-3"}>
              {links.map((link) => (
                <Link
                  href={link.href}
                  key={link.id}
                  className={`hover:bg-white hover:text-blue-600 transition-all ease-in-out duration-300 text-[13px] rounded-md ${link.href === "/manager" ? (pathname === link.href ? "bg-white text-blue-600 font-bol" : "") : pathname.includes(link.href) ? "bg-white text-blue-600 font-bold" : "bg-none text-inherit font-normal"}`}
                >
                  <HStack className={"space-x-2 items-center pl-3 py-3 pr-12"}>
                    <link.icon size={13} />
                    <span>{link.title}</span>
                  </HStack>
                </Link>
              ))}
            </VStack>

            <Button
              variant="link"
              className={`hover:bg-white hover:text-red-500 hover:no-underline transition-all ease-in-out duration-300 bg-none text-inherit px-0 justify-start text-[13px] font-normal`}
              onClick={logout}
            >
              <HStack className={"space-x-2 items-center pl-3 py-3 pr-12"}>
                <LogOut size={13} />
                <span>Logout</span>
              </HStack>
            </Button>
          </VStack>
        </VStack>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
