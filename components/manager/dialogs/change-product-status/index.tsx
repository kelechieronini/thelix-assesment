import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { _changeProductStatus } from "@/lib/api/product.api";
import { QueryKeys } from "@/lib/constants/keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  productID: string;
  status: string;
  title: string;
  query: string;
  page?: number;
};

const ChangeProductStatus = ({
  isOpen,
  onClose,
  productID,
  status,
  title,
  query,
  page,
}: Props) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { isPending, mutate } = useMutation({
    mutationFn: _changeProductStatus,
    onSuccess: () => {
      toast({ title: `Product status changed to ${status}.` });
      onClose();
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_PRODUCTS, page],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_SINGLE_PRODUCT, productID],
      });
    },
    onError: (err: any) => {
      if (err?.response?.data) {
        toast({
          title: "Error!",
          description: err?.response?.data?.message,
        });
      } else {
        toast({
          title: "Error!",
          description: err.message,
        });
      }
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="px-7 pt-7 pb-9"
        aria-describedby="Delete contents"
      >
        <DialogTitle className="font-semibold text-primary capitalize">
          {title}
        </DialogTitle>

        <p className="font-light text-primary">{query}</p>

        <div className="flex items-center justify-center space-x-5 mt-3">
          <Button
            className="w-full bg-primary hover:bg-primary"
            isLoading={isPending}
            onClick={() => mutate({ productID, status })}
          >
            Yes, I&apos;m sure
          </Button>
          <Button
            onClick={() => onClose()}
            className="bg-inherit w-full border border-primary text-primary"
          >
            No, cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeProductStatus;
