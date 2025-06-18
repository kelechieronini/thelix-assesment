import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDisclosure } from "@/lib/hooks/use-disclosure";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/manager/status-badge";
import { Product } from "@/lib/types/product.type";
import ChangeProductStatus from "@/components/manager/dialogs/change-product-status";
import { useState } from "react";

type Props = {
  products: Product[];
  page?: number;
};

const InventoryDataTable = ({ products, page }: Props) => {
  const headers = [
    "Product ID",
    "Product Name",
    "Category",
    "Stock Level",
    "Price",
    "Status",
  ];

  const [productID, setProductID] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const { push } = useRouter();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleRowClick = (status: string, id: string) => {
    setProductID(id);
    setStatus(status);

    onOpen();
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F6F6F6] border-b border-muted hover:bg-[#f6f6f6]">
            <TableHead></TableHead>
            {headers.map((head, index) => (
              <TableHead
                className="text-muted text-xs text-center font-normal"
                key={index}
              >
                {head}
              </TableHead>
            ))}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow className="!border-b border-muted" key={product.id}>
              <TableCell>
                <Checkbox className="rounded" />
              </TableCell>

              <TableCell className="uppercase text-sm text-center">
                {product.id.split("-")[0].toUpperCase()}
              </TableCell>
              <TableCell className="text-sm text-center capitalize">
                {product.name.slice(0, 40)}
                {product.length > 40 && "..."}
              </TableCell>
              <TableCell className="text-sm text-center capitalize">
                {product.category.name}
              </TableCell>
              <TableCell className="text-sm text-center">
                {Number(product.quantity_in_stock).toLocaleString()}
              </TableCell>
              <TableCell className="text-sm text-center">
                &#x20A6;{Number(product.price).toLocaleString()}
              </TableCell>
              <TableCell className="text-sm text-center">
                <StatusBadge status={product.status} />
              </TableCell>

              <TableCell className="text-sm text-center">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <Button size="icon" className="h-10" variant="link">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="text-sm font-light border-b border-[#F6F6F6] rounded-sm"
                      onClick={() => push(`/manager/inventory/${product.id}`)}
                    >
                      View Product
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-sm font-light border-b border-[#F6F6F6] rounded-sm"
                      onClick={() =>
                        push(`/manager/inventory/edit?product=${product.id}`)
                      }
                    >
                      Edit Product
                    </DropdownMenuItem>
                    {product.status === "active" && (
                      <DropdownMenuItem
                        className="text-sm font-light border-b border-[#F6F6F6] rounded-sm"
                        onClick={() => handleRowClick("inactive", product.id)}
                      >
                        Make Inactive
                      </DropdownMenuItem>
                    )}
                    {product.status === "inactive" && (
                      <DropdownMenuItem
                        className="text-sm font-light border-b border-[#F6F6F6] rounded-sm"
                        onClick={() => handleRowClick("active", product.id)}
                      >
                        Make active
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ChangeProductStatus
        isOpen={isOpen}
        onClose={onClose}
        productID={productID}
        status={status}
        title={`Make Product ${status}`}
        query={`Are you sure you want to make product ${status}?`}
        page={page}
      />
    </>
  );
};

export default InventoryDataTable;
