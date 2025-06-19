import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const App = () => {
  return (
    <div className="bg-[#02071d] h-screen flex flex-col items-center justify-center gap-8">
      <p className="text-white md:text-6xl text-4xl text-center font-bold">
        THELIX ASSESMENT
      </p>

      <Link href="/dashboard/inventory" passHref>
        <Button className="bg-white text-[#02071d]">View Dashboard</Button>
      </Link>
    </div>
  );
};

export default App;
