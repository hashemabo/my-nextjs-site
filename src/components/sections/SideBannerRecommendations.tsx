'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { products } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function SideBannerRecommendations() {
  const [isOpen, setIsOpen] = useState(true);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [flippedProducts, setFlippedProducts] = useState<Set<number>>(new Set());

  // ⭐ الحل: اختيار المنتجات يتم في المتصفح فقط لمنع Hydration Error
  useEffect(() => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    setRecommended(shuffled.slice(0, 3));
  }, []);

  // دالة قلب المنتج
  const toggleFlip = (productId: number) => {
    setFlippedProducts(prev => {
      const newSet = new Set(prev);
      newSet.has(productId) ? newSet.delete(productId) : newSet.add(productId);
      return newSet;
    });
  };

  return (
    <div className="fixed top-1/4 right-0 z-50 flex items-center pointer-events-none">

      {/* زر الفتح/الإغلاق */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          pointer-events-auto
          flex items-center justify-center
          bg-gradient-to-b from-yellow-500 to-yellow-700
          text-white shadow-lg hover:shadow-2xl
          p-3 rounded-l-xl border-2 border-yellow-300
          transition-all duration-300 hover:scale-105
          hover:from-yellow-600 hover:to-yellow-800
          active:scale-95
        "
      >
        <motion.span
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          className="text-lg font-bold"
        >
          {isOpen ? '⮞' : '⮜'}
        </motion.span>
      </button>

      {/* البانر الجانبي */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="
              pointer-events-auto
              w-64 
              bg-white/60 
              backdrop-blur-xl 
              shadow-2xl 
              rounded-l-3xl 
              p-3 
              border-2 border-white/50
              space-y-3
            "
          >
            {/* عنوان */}
            <div className="text-center">
              <h3 className="font-bold text-lg text-yellow-800 drop-shadow mb-1">
                موصى به لك
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
            </div>

            {/* المنتجات */}
            <div className="space-y-2">
              {recommended.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* تأثير التقليب */}
                    <motion.div
                      className="relative w-full h-20 cursor-pointer"
                      onClick={() => toggleFlip(product.id)}
                      animate={{ rotateY: flippedProducts.has(product.id) ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* الوجه الأمامي */}
                      <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden" }}>
                        <Link
                          href={`/products/${product.id}`}
                          className="flex items-center gap-2 bg-white/80 backdrop-blur-md p-2 rounded-lg shadow-sm border border-white/60 group w-full h-full"
                        >
                          <div className="relative flex-shrink-0">
                            <Image
                              src={product.images[0].imageUrl}
                              alt={product.name.ar}
                              width={40}
                              height={40}
                              className="rounded-md shadow w-10 h-10 object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-800 truncate group-hover:text-yellow-800 transition">
                              {product.name.ar}
                            </p>
                            <p className="text-[11px] text-yellow-700 font-bold">
                              {product.prices.sar} ر.س
                            </p>
                          </div>
                        </Link>
                      </div>

                      {/* الوجه الخلفي */}
                      <div
                        className="absolute inset-0 w-full h-full"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                      >
                        <div className="flex items-center gap-2 bg-gradient-to-br from-yellow-500 to-yellow-600 p-2 rounded-lg text-white border border-yellow-300 w-full h-full">
                          <Image
                            src={product.images[1]?.imageUrl || product.images[0].imageUrl}
                            alt={product.name.ar}
                            width={40}
                            height={40}
                            className="rounded-md w-10 h-10 object-cover border-2 border-yellow-200"
                          />

                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{product.name.ar}</p>
                            <p className="text-[11px] font-bold">{product.prices.sar} ر.س</p>
                            <p className="text-[9px] text-yellow-100">اضغط للعودة</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* تلميح */}
            <p className="text-xs text-center text-gray-600 pt-2 border-t border-white/40">
              انقر على المنتج لرؤية المزيد
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
