import React, { ReactNode } from "react";
import { HStack, VStack } from "@/components/ui/stack";
import Sidebar from "@/components/manager/sidebar";
import Topbar from "@/components/manager/topbar";

type Props = {
  children: ReactNode;
};

const ManagerLayout = async ({ children }: Props) => {
  return (
    <HStack className={"w-full min-h-screen"}>
      <Sidebar />
      <VStack className={"grow bg-neutral-300"}>
        <Topbar />
        <div className="min-w-full md:h-[90vh] overflow-y-auto no-scrollbar">
          {children}
        </div>
      </VStack>
    </HStack>
  );
};

export default ManagerLayout;
