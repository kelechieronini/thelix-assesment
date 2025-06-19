import { Badge } from "@/components/ui/badge";
import { Footprints, GraduationCap, Shirt } from "lucide-react";

type Props = {
  title: string;
  amount: Number;
};

const InventoryStatsCard = ({ title, amount }: Props) => {
  const statusInfo: Record<
    any,
    { className: string; icon: React.ReactElement }
  > = {
    Shoes: {
      className: "bg-indigo-100 text-indigo-700 rounded-md",
      icon: <Footprints size={16} />,
    },
    Clothes: {
      className: "bg-emerald-100 text-emerald-700 rounded-md",
      icon: <Shirt size={16} />,
    },
    Hats: {
      className: "bg-amber-100 text-amber-700 rounded-md",
      icon: <GraduationCap size={16} />,
    },
  };

  return (
    <div className="bg-white flex flex-col space-y-4 shadow-sm py-6 px-7 rounded-md">
      <div className="flex items-center space-x-2">
        <Badge className={statusInfo[title.split(" ")[0]].className}>
          {statusInfo[title.split(" ")[0]].icon}
        </Badge>
        <p className="text-muted text-[10px] capitalize">{title}</p>
      </div>

      <h2 className="text-black font-bold text-4xl">
        {Number(amount).toLocaleString()}
      </h2>
    </div>
  );
};

export default InventoryStatsCard;
