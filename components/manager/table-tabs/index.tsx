import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  tabs: string[];
  state: string;
  setState: (x: string) => void;
};

const TableTabs = ({ tabs, state, setState }: Props) => {
  const stateColor: Record<any, { className: string }> = {
    all: {
      className: "border-b-2 border-[#1D41E0]",
    },
    completed: {
      className: "border-b-2 border-[#019445]",
    },
    active: {
      className: "border-b-2 border-[#019445]",
    },
    inactive: {
      className: "border-b-2 border-muted",
    },
    draft: {
      className: "border-b-2 border-muted",
    },
    pending: {
      className: "border-b-2 border-[#EC6300]",
    },
    incomplete: {
      className: "border-b-2 border-destructive",
    },
  };

  return (
    <div className="flex w-full items-center md:space-x-5 border-b border-muted">
      {tabs.map((tab, index) => (
        <Button
          className={`bg-inherit h-11 text-sm font-light capitalize ${state === tab ? stateColor[state].className : ""}`}
          variant="ghost"
          key={index}
          onClick={() => setState(tab)}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};

export default TableTabs;
