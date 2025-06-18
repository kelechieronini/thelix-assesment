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
    "Price",
    "Description",
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
                {product.id}
              </TableCell>
              <TableCell className="text-sm text-center capitalize">
                {product.name}
              </TableCell>
              <TableCell className="text-sm text-center capitalize">
                {product.price}
              </TableCell>
              <TableCell className="text-sm text-center">
                {product.description}
              </TableCell>
              <TableCell className="text-sm text-center">
                {product.category}
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
                      onClick={() => push(`/inventory/${product.id}`)}
                    >
                      View Product
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-sm font-light border-b border-[#F6F6F6] rounded-sm"
                      onClick={() =>
                        push(`/inventory/edit?product=${product.id}`)
                      }
                    >
                      Edit Product
                    </DropdownMenuItem>
                    {product.category === "active" && (
                      <DropdownMenuItem
                        className="text-sm font-light border-b border-[#F6F6F6] rounded-sm"
                        onClick={() => handleRowClick("inactive", product.id)}
                      >
                        Make Inactive
                      </DropdownMenuItem>
                    )}
                    {product.category === "inactive" && (
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
