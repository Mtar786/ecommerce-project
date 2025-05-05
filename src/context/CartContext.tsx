// src/context/CartContext.tsx
// src/context/CartContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ProductType = { id: number; name: string; price: number; description?: string; imageUrl?: string; createdAt: string };

interface CartContextType {
  cart: ProductType[];
  addToCart: (item: ProductType) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ProductType[]>([]);

  const addToCart = (item: ProductType) => {
    console.log('🛒 Adding to cart:', item);
    setCart(prev => {
      const updated = [...prev, item];
      console.log('📦 Cart now has items:', updated);
      return updated;
    });
  };

  const removeFromCart = (id: number) => {
    console.log('❌ Removing from cart id:', id);
    setCart(prev => {
      const updated = prev.filter(p => p.id !== id);
      console.log('📦 Cart now has items:', updated);
      return updated;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
