'use client';

import React, { useMemo } from 'react';
import ProductsSection from './ProductsSection';
import { products } from '@/lib/data';
import { motion } from 'framer-motion';

export default function RecommendedProductsSection() {
  // 🔀 اختيار 3 منتجات عشوائية
  const recommendations = useMemo(() => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

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
      />
    </motion.div>
  );
}
