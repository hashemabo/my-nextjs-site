'use client';

import React, { useMemo } from 'react';
import ProductsSection from './ProductsSection';
import { motion } from 'framer-motion';

interface RecommendedProductsSectionProps {
  products?: any[];
}

export default function RecommendedProductsSection({ products }: RecommendedProductsSectionProps) {
  const recommendations = useMemo(() => {
    const productsToUse = products || [];
    const shuffled = [...productsToUse].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [products]);

  const productIds = recommendations.map((p) => p.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <ProductsSection
        title="موصى به لك"
        productIds={productIds}
        products={products} // ⭐ مرري المنتجات المعربة
      />
    </motion.div>
  );
}