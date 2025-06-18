import { Product } from "@/lib/types/product.type";
import { create } from "zustand";

interface ProductStore {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  setProducts: (products: Product[]) => void;
}

// Step 2: Create the store with proper typing
export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),

  setProducts: (products) => set({ products }),
}));
