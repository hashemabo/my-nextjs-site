'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Product } from '@/lib/data';

// ⭐ دالة محسنة لتحويل اسم المنتج إلى نص
const getProductName = (name: any): string => {
  console.log('🔍 getProductName input:', name); // للتصحيح
  if (typeof name === 'string') return name;
  if (name && typeof name === 'object') {
    return name.ar || name.en || 'منتج';
  }
  return 'منتج';
};

// ⭐ دالة محسنة لتحويل وصف المنتج إلى نص
const getProductDescription = (description: any): string => {
  if (typeof description === 'string') return description;
  if (description && typeof description === 'object') {
    return description.ar || description.en || '';
  }
  return '';
};

export type CartItem = Omit<Product, 'name' | 'description' | 'longDescription'> & { 
  name: string;
  description: string;
  longDescription: string;
  quantity: number;
};

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('eleganceCart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCart([]);
      } finally {
        setIsInitialized(true);
      }
    } else {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && isInitialized) {
      try {
        localStorage.setItem('eleganceCart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Product, quantity = 1) => {
    if (!isInitialized) return;
    
    console.log('🛒 Original product name:', product.name); // للتصحيح
    
    // ⭐ تحويل name و description إلى strings باستخدام الدوال المحسنة
    const productName = getProductName(product.name);
    const productDescription = getProductDescription(product.description);
    const productLongDescription = getProductDescription(product.longDescription);

    console.log('🛒 Converted product name:', productName); // للتصحيح

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      const newItem = { 
        ...product, 
        name: productName,
        description: productDescription,
        longDescription: productLongDescription,
        quantity 
      };
      console.log('🛒 Adding new item to cart:', newItem);
      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (productId: string) => {
    if (!isInitialized) return;
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (!isInitialized) return;
    setCart((prevCart) =>
      prevCart.map((item) => 
        (item.id === productId ? { ...item, quantity } : item)
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    if (!isInitialized) return;
    setCart([]);
  };

  const contextValue: CartContextType = {
    cart: isInitialized ? cart : [],
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setIsCartOpen
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};