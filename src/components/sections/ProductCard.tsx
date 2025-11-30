'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dictionary } from '@/lib/dictionary';

interface ProductCardProps {
  product: any;
  onAddToCart?: (product: any) => void;
  onIncreaseQuantity?: (productId: string) => void;
  onDecreaseQuantity?: (productId: string) => void;
  getProductQuantity?: (productId: string) => number;
}

export default function ProductCard({
  product,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  getProductQuantity
}: ProductCardProps) {
  const { language } = useLanguage();
  
  const t = (key: keyof typeof dictionary) => dictionary[key]?.[language] || key;

  const productQuantity = getProductQuantity ? getProductQuantity(product.id) : 0;

  return (
    <div className="group bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0].imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <h3 className="font-headline text-xl font-bold text-primary mb-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-primary">
            SAR {product.prices.sar.toFixed(2)}
          </div>
          <div className="text-sm text-muted-foreground">
            <div>AED {product.prices.aed.toFixed(2)}</div>
            <div>KWD {product.prices.kwd.toFixed(2)}</div>
          </div>
        </div>

        {/* ✅ أزرار التحكم في الكمية */}
        {productQuantity > 0 ? (
          <div className="flex items-center justify-between gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDecreaseQuantity?.(product.id)}
              className="h-10 w-10 p-0 flex items-center justify-center"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-primary">
                {productQuantity}
              </span>
              <span className="text-xs text-muted-foreground">
                {language === 'ar' ? 'في السلة' : 'in cart'}
              </span>
            </div>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => onIncreaseQuantity?.(product.id)}
              className="h-10 w-10 p-0 flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => onAddToCart?.(product)}
            className="w-full"
            size="lg"
          >
            <ShoppingCart className="me-2 h-4 w-4" />
            {t('addToCart')}
          </Button>
        )}
      </div>
    </div>
  );
}