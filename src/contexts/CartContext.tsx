'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Product } from '@/lib/data';

export type CartItem = Omit<Product, 'name' | 'description' | 'longDescription'> & { 
  name: string;
  description: string;
  longDescription: string;
  quantity: number;
};

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Omit<Product, 'name' | 'description' | 'longDescription'> & { name: string, description: string, longDescription: string }, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // ✅ الإصلاح: تهيئة الحالة بعد التأكد من أننا في العميل
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ الإصلاح: تحميل السلة من localStorage مع التحقق من البيئة
  useEffect(() => {
    // هذا التأكد يمنع التنفيذ على الخادم
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('eleganceCart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // في حالة خطأ، نبدأ بسلة فارغة
        setCart([]);
      } finally {
        setIsInitialized(true);
      }
    } else {
      // على الخادم، نضع حالة initialized مباشرة
      setIsInitialized(true);
    }
  }, []);

  // ✅ الإصلاح: حفظ السلة مع معالجة الأخطاء
  useEffect(() => {
    if (typeof window !== 'undefined' && isInitialized) {
      try {
        localStorage.setItem('eleganceCart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Omit<Product, 'name' | 'description' | 'longDescription'> & { name: string, description: string, longDescription: string }, quantity = 1) => {
    // ✅ منع التنفيذ إذا لم يتم التهيئة بعد
    if (!isInitialized) return;
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
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

  // ✅ تقديم context فقط بعد التهيئة
  const contextValue: CartContextType = {
    cart: isInitialized ? cart : [], // خلال التهيئة، نعود بمصفوفة فارغة
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