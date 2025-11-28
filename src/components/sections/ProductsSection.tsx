'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { dictionary } from '@/lib/dictionary';
import { useLanguage } from '@/contexts/LanguageContext';
import { products, type Product as ProductData } from '@/lib/data';

const ProductsSection: React.FC = () => {
  const { language } = useLanguage();
  const t = (key: keyof typeof dictionary) => dictionary[key]?.[language] || key;
  const { addToCart, setIsCartOpen } = useCart();
  const { toast } = useToast();

  // ⭐ أنشئي localizedProducts مرة واحدة واستخدميها في كل مكان
  const localizedProducts = products.map((product) => ({
    ...product,
    name: product.name[language] || product.name.ar,
    description: product.description[language] || product.description.ar,
    longDescription: product.longDescription?.[language] || product.longDescription?.ar || '',
  }));

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault(); 
    e.stopPropagation();
    console.log('🛒 Adding product from ProductsSection:', product.name); // للتصحيح
    addToCart(product);
    toast({
        title: t('addToCartSuccess'),
        description: product.name,
    });
    setIsCartOpen(true);
  };
  
  const handleOrderNow = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🛒 Ordering product from ProductsSection:', product.name); // للتصحيح
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <section id="products" className="bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
            {t('productsTitle')}
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {localizedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} passHref>
              <Card className="overflow-hidden flex flex-col group h-full cursor-pointer">
                <CardHeader className="p-0">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={product.images[0].imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={product.images[0].imageHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                  <div className="mt-4 text-sm font-semibold">
                    <p>
                      <span className="font-bold">SAR:</span> {product.prices.sar.toFixed(2)}
                    </p>
                    <p>
                      <span className="font-bold">AED:</span> {product.prices.aed.toFixed(2)}
                    </p>
                    <p>
                      <span className="font-bold">KWD:</span> {product.prices.kwd.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex gap-2 w-full">
                    <Button variant="secondary" className="w-full" onClick={(e) => handleOrderNow(e, product)}>
                      {t('orderNow')}
                    </Button>
                    <Button className="w-full" onClick={(e) => handleAddToCart(e, product)}>
                      {t('addToCart')}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;