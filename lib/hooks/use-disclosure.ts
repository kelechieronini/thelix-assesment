import { useState } from "react";

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const onOpen = () => setIsOpen(true);

  const onToggle = () => setIsOpen((prev) => !prev);

  const onChange = (d: boolean) => setIsOpen(d);

  return { isOpen, onClose, onOpen, onToggle, onChange };
};
