'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Product } from '@/lib/data';

export type LocalizedProduct = Omit<Product, 'name' | 'description' | 'longDescription'> & { 
  name: string;
  description: string;
  longDescription: string;
};

export type CartItem = LocalizedProduct & {
  quantity: number;
  selectedPrice?: number;
  selectedCurrency?: string;
};

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: LocalizedProduct, quantity?: number, selectedCurrency?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
  getOrderData: () => {
    items: Array<{
      name: string;
      quantity: number;
      price: number;
      currency: string;
    }>;
    total: number;
    currency: string;
  };
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
          const parsedCart = JSON.parse(savedCart);
          setCart(Array.isArray(parsedCart) ? parsedCart : []);
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

  const addToCart = (
    product: LocalizedProduct, 
    quantity = 1, 
    selectedCurrency = 'sar'
  ) => {
    if (!isInitialized) return;
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id 
            ? { 
                ...item, 
                quantity: item.quantity + quantity,
                selectedCurrency: selectedCurrency || item.selectedCurrency
              } 
            : item
        );
      }
      
      const selectedPrice = product.prices?.[selectedCurrency as keyof typeof product.prices] || 0;
      
      return [...prevCart, { 
        ...product, 
        quantity,
        selectedPrice,
        selectedCurrency
      }];
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

  // ✅ إضافة دالة getOrderData المفقودة
  const getOrderData = () => {
    if (!isInitialized || cart.length === 0) {
      return { items: [], total: 0, currency: 'sar' };
    }

    const currency = cart[0]?.selectedCurrency || 'sar';
    
    const items = cart.map(item => {
      const productName = item.name || 'منتج بدون اسم';
      const price = item.selectedPrice || item.prices?.[currency as keyof typeof item.prices] || 0;
      
      return {
        name: productName,
        quantity: item.quantity,
        price: price,
        currency: item.selectedCurrency || currency
      };
    });

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return { 
      items, 
      total, 
      currency
    };
  };

  const contextValue: CartContextType = {
    cart: isInitialized ? cart : [],
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setIsCartOpen,
    getOrderData // ✅ إضافة الدالة هنا
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