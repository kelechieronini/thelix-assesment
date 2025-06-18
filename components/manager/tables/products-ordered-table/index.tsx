import { HStack, VStack } from "@/components/ui/stack";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderDetail } from "@/lib/types/order.type";
import Image from "next/image";

type Props = {
  products: OrderDetail[];
  total: number;
  items_count: number;
};

const ProductsOrderedTable = ({ products, total, items_count }: Props) => {
  const headers = ["products", "qty", "Rate"];

  return (
    <>
      {products.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F6F6] border-b border-muted hover:bg-[#f6f6f6]">
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="capitalize text-muted text-xs font-normal"
                >
                  {header}
                </TableHead>
              ))}
              <TableHead
                align="right"
                className="capitalize text-muted text-xs text-right font-normal"
              >
                Subtotal
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Map Products */}
            {products.map((product) => (
              <TableRow className="!border-b border-muted" key={product.id}>
                <TableCell>
                  <HStack className="space-x-2 items-center">
                    <Image
                      src={product.product.image}
                      alt={product.product.name}
                      width={30}
                      height={30}
                    />
                    <VStack className="space-y-0.5">
                      <p className="text-xs text-black capitalize">
                        {product.product.name}
                      </p>
                      <p className="text-muted text-[10px] font-light leading-4">
                        {product.product.description.slice(0, 30)}
                        {product.product.description.length > 30 && "..."}
                      </p>
                    </VStack>
                  </HStack>
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  {Number(product.price).toLocaleString()}.00
                </TableCell>
                <TableCell align="right">
                  &#x20A6;{Number(product.sub_total).toLocaleString()}.00
                </TableCell>
              </TableRow>
            ))}

            <TableRow className="!border-b-0">
              <TableCell colSpan={2}></TableCell>
              <TableCell>
                <h3 className="text-primary font-bold text-sm">SUB TOTAL</h3>
              </TableCell>
              <TableCell align="right">
                &#x20A6;{Number(total).toLocaleString()}.00
              </TableCell>
            </TableRow>

            <TableRow className="!border-b-0">
              <TableCell colSpan={2}></TableCell>
              <TableCell colSpan={2} className="relative -top-3">
                <p className="text-sm font-light">
                  TOTAL QUANTITY: {Number(items_count).toLocaleString()}
                </p>
              </TableCell>
            </TableRow>

            <TableRow className="!border-b-0 relative -top-3">
              <TableCell colSpan={2}></TableCell>
              <TableCell>
                <h3 className="text-primary font-bold text-sm">DELIVERY FEE</h3>
              </TableCell>
              <TableCell align="right">&#x20A6;0.00</TableCell>
            </TableRow>

            <TableRow className="!border-b-0 relative -top-3">
              <TableCell colSpan={2}></TableCell>
              <TableCell>
                <h3 className="text-primary font-bold text-sm">DISCOUNT</h3>{" "}
              </TableCell>
              <TableCell align="right">--</TableCell>
            </TableRow>

            <TableRow className="!border-b-0 relative -top-3">
              <TableCell colSpan={1}></TableCell>
              <TableCell
                colSpan={3}
                className="border-t border-black"
              ></TableCell>
            </TableRow>

            <TableRow className="!border-b-0 relative -top-6">
              <TableCell colSpan={2}></TableCell>
              <TableCell>
                <h3 className="text-primary font-bold text-sm">TOTAL</h3>
              </TableCell>
              <TableCell align="right">
                <h3 className="text-primary font-bold text-sm text-right">
                  &#x20A6;{Number(total).toLocaleString()}.00
                </h3>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}

      {products.length === 0 && (
        <h3 className="text-center text-lg font-semibold py-10">
          No products.
        </h3>
      )}
    </>
  );
};

export default ProductsOrderedTable;
