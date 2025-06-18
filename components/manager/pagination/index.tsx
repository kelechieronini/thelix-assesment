import { Button } from "@/components/ui/button";
import { FilterProps } from "@/lib/types/pagination.type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Spinner from "@/components/ui/spinner";

const Pagination = ({
  page,
  setPage,
  itemsPerPage,
  totalItems,
  totalPages,
  isLoading,
}: FilterProps) => {
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <div className="flex items-center space-x-3">
      {isLoading ? (
        <Spinner size={20} />
      ) : (
        <p className="text-muted font-light text-xs">
          {startItem} - {endItem} of {totalItems}
        </p>
      )}

      <div className="flex items-center">
        <Button
          variant="link"
          size="icon"
          className="bg-none px-0 mx-0"
          onClick={() => setPage(page - 1)}
          disabled={isLoading || page <= 1}
        >
          <ChevronLeft size={19} />
        </Button>
        <Button
          variant="link"
          size="icon"
          className="bg-none px-0 mx-0"
          onClick={() => setPage(page + 1)}
          disabled={isLoading || page >= totalPages}
        >
          <ChevronRight size={19} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
