import { Badge } from "@/components/ui/badge";
import { Status } from "@/lib/types/status.type";

type Props = {
  status: Status;
};

const StatusBadge = ({ status }: Props) => {
  const statusInfo: Record<Status, { className: string }> = {
    pending: {
      className: "bg-[#FFE6CF] text-[#EC6300]",
    },
    completed: {
      className: "bg-[#D9FFE1] text-[#019445]",
    },
    incomplete: {
      className: "bg-[#FFDBDB] text-[#D20000]",
    },
    active: {
      className: "bg-[#D9FFE1] text-[#019445]",
    },
    inactive: {
      className: "bg-[#FFDBDB] text-[#D20000]",
    },
    draft: {
      className: "bg-gray-100 text-muted",
    },
    paid: {
      className: "bg-[#D9FFE1] text-[#019445]",
    },
    "not paid": {
      className: "bg-[#FFDBDB] text-[#D20000]",
    },
  };

  return (
    <Badge
      className={`${statusInfo[status].className} py-2 px-4 capitalize text-sm font-light`}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
