'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, ProductItem } from '@/types/catalog';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  hasChicks: boolean;
  hasVaccines: boolean;
  hasDrugs: boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (product: ProductItem, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'damingrow_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // Storage unavailable or JSON malformed
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch {
        // Storage full or quota exceeded
      }
    }
  }, [items, isMounted]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const addItem = (product: ProductItem, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const existing = updated[existingIndex];
        if (existing) {
          updated[existingIndex] = {
            ...existing,
            quantity: existing.quantity + quantity,
          };
        }
        return updated;
      } else {
        const initialQty = Math.max(quantity, product.minOrderQty || 1);
        return [...prevItems, { product, quantity: initialQty }];
      }
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product.id === productId) {
          const validQty = Math.max(quantity, item.product.minOrderQty || 1);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const hasChicks = items.some((item) => item.product.category === 'chicks');
  const hasVaccines = items.some((item) => item.product.category === 'vaccines');
  const hasDrugs = items.some((item) => item.product.category === 'drugs');

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalAmount,
        hasChicks,
        hasVaccines,
        hasDrugs,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
