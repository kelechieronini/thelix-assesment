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
    <div className="flex items-center gap-3 w-full">
      {/* {isLoading ? (
        <Spinner size={20} />
      ) : (
        <p className="text-muted font-light text-xs">
          {startItem} - {endItem} of {totalItems}
        </p>
      )} */}

      <div className="flex items-center justify-center w-full gap-7">
        <Button
          variant="link"
          size="icon"
          className="bg-none px-0 mx-0 w-fit"
          onClick={() => setPage(page - 1)}
          disabled={isLoading || page <= 1}
        >
          <div className="flex items-center">
            <ChevronLeft size={25} />
            <p>Previous</p>
          </div>
        </Button>
        <Button
          variant="link"
          size="icon"
          className="bg-none px-0 mx-0 w-fit"
          onClick={() => setPage(page + 1)}
          disabled={isLoading || page >= totalPages}
        >
          <div className="flex items-center">
            <p>Next</p>
            <ChevronRight size={25} />
          </div>{" "}
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
