'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product as DataProduct } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { dictionary } from '@/lib/dictionary';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import { products } from '@/lib/data';

type Product = Omit<DataProduct, 'name'|'description'|'longDescription'> & {
  name: string;
  description: string;
  longDescription: string;
}

const RecommendedProductsSection: React.FC = () => {
  const { language } = useLanguage();
  const t = (key: keyof typeof dictionary) => dictionary[key]?.[language] || key;
  const { cart, addToCart, setIsCartOpen } = useCart();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<DataProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const topSellers = ['prod-001', 'prod-003', 'prod-005'];
        const viewingHistory: string[] = JSON.parse(localStorage.getItem('viewingHistory') || '[]');
        const cartItems = cart.map(item => item.id);

        const result = await getProductRecommendations({
            topSellers,
            viewingHistory,
            cartItems,
            numRecommendations: 3
        });
        
        const recommendedProducts = products.filter(p => result.productIds.includes(p.id) && !cartItems.includes(p.id));
        
        // If not enough recommendations, fill with top sellers not in cart
        if (recommendedProducts.length < 3) {
            const fallback = topSellers.map(id => products.find(p => p.id === id)).filter(Boolean) as DataProduct[];
            const additional = fallback.filter(p => !recommendedProducts.some(r => r.id === p.id) && !cartItems.includes(p.id));
            recommendedProducts.push(...additional.slice(0, 3 - recommendedProducts.length));
        }

        setRecommendations(recommendedProducts);

      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        // Fallback to top sellers if AI fails
        const topSellersProducts = products.filter(p => ['prod-001', 'prod-003', 'prod-005'].includes(p.id));
        setRecommendations(topSellersProducts.slice(0, 3));
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch recommendations if there are products
    if (products.length > 0) {
        fetchRecommendations();
    } else {
        setIsLoading(false);
    }
  }, [cart]);
  
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
     toast({
        title: t('addToCartSuccess'),
        description: product.name,
    });
    setIsCartOpen(true);
  };

  const handleOrderNow = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsCartOpen(true);
  };
  
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden flex flex-col">
                <Skeleton className="aspect-square w-full" />
                <CardContent className="p-4 flex-grow">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-1/3" />
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
        ))}
    </div>
  )


  if (recommendations.length === 0 && !isLoading) {
    return null; // Don't render the section if there are no recommendations
  }

  const localizedRecommendations: Product[] = recommendations.map(p => ({
    ...p,
    name: p.name[language],
    description: p.description[language],
    longDescription: p.longDescription[language],
  }));

  return (
    <section id="recommendations" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
            {t('recommendationsTitle')}
          </h2>
        </div>
        <div className="mt-12">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {localizedRecommendations.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} passHref>
                  <Card className="overflow-hidden flex flex-col group h-full cursor-pointer">
                    <CardHeader className="p-0">
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={product.images[0].imageUrl}
                          alt={product.name as string}
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
          )}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProductsSection;
