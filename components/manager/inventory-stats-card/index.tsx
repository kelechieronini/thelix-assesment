import { Badge } from "@/components/ui/badge";
import { Archive, Layers, Wifi } from "lucide-react";

type Props = {
  title: string;
  amount: Number;
};

const InventoryStatsCard = ({ title, amount }: Props) => {
  const statusInfo: Record<
    any,
    { className: string; icon: React.ReactElement }
  > = {
    total: {
      className: "bg-[#ECF1FF] text-[#1D41E0]",
      icon: <Layers size={16} />,
    },
    active: {
      className: "bg-[#D9FFE1] text-[#019445]",
      icon: <Wifi size={16} style={{ transform: "rotate(45deg)" }} />,
    },
    drafts: {
      className: "bg-[#F6F6F6] text-muted",
      icon: <Archive size={16} />,
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
