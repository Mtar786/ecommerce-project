// src/context/CartContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

// Shape of a Product (matches your Prisma model)
export type ProductType = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  createdAt: string;
};

// What the context provides
interface CartContextType {
  cart: ProductType[];
  addToCart: (item: ProductType) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ProductType[]>([]);

  const addToCart = (item: ProductType) =>
    setCart((prev) => [...prev, item]);

  const removeFromCart = (id: number) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('`useCart` must be used within a `<CartProvider>`');
  }
  return ctx;
}
