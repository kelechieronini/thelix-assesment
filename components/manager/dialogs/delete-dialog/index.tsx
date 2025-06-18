import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  query: string;
  init: () => void;
  isLoading: boolean;
};

const DeleteDialog = ({
  isOpen,
  onClose,
  title,
  query,
  init,
  isLoading,
}: Props) => {
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
            className="w-full bg-destructive hover:bg-destructive"
            isLoading={isLoading}
            onClick={() => init()}
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

export default DeleteDialog;
