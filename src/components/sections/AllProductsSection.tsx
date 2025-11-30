'use client';

import React from 'react';
import ProductsSection from './ProductsSection';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { dictionary } from '@/lib/dictionary';

interface AllProductsSectionProps {
  products?: any[];
  onAddToCart?: (product: any) => void;
  onIncreaseQuantity?: (productId: string) => void;
  onDecreaseQuantity?: (productId: string) => void;
  getProductQuantity?: (productId: string) => number;
}

export default function AllProductsSection({ 
  products, 
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  getProductQuantity 
}: AllProductsSectionProps) {
  const { language } = useLanguage();
  
  const t = (key: keyof typeof dictionary) => dictionary[key]?.[language] || key;

  // ✅ جميع معرفات المنتجات
  const allProductIds = products?.map((p) => p.id) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <ProductsSection
        title={t('productsTitle') || "مجموعتنا الحصرية"}
        productIds={allProductIds}
        products={products}
        // ✅ تمرير الدوال للتحكم بالكمية
        onAddToCart={onAddToCart}
        onIncreaseQuantity={onIncreaseQuantity}
        onDecreaseQuantity={onDecreaseQuantity}
        getProductQuantity={getProductQuantity}
      />
    </motion.div>
  );
}