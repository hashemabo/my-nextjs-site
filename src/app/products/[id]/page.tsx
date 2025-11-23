'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { products } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { dictionary } from '@/lib/dictionary';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CartSidebar from '@/components/common/CartSidebar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function ProductPage({ params }: { params: { id: string } }) {
  const { language, dir } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart();
  const { toast } = useToast();
  const t = (key: keyof typeof dictionary) => dictionary[key][language];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = products.find((p) => p.id === params.id);
  
  const handleAddToCart = () => {
    if (!product) return;
    const localizedProduct = {
      ...product,
      name: product.name[language],
      description: product.description[language],
      longDescription: product.longDescription[language],
    };
    addToCart(localizedProduct);
    toast({
        title: t('addToCartSuccess'),
        description: product?.name[language],
    });
    setIsCartOpen(true);
  };
  
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    toast({
        title: isFavorite ? t('favoritesRemove') : t('favoritesAdd'),
    });
  };

  const nextImage = () => {
      if(product) {
          setActiveIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
      }
  }

  const prevImage = () => {
      if(product) {
          setActiveIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
      }
  }

  if (!product) {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center text-center">
             <Header
                navLinks={t('navLinks')}
                langToggle={t('langToggle')}
                appName={t('appName')}
            />
            <main className="flex-1 flex items-center justify-center">
                <div className="container mx-auto p-6">
                    <h1 className="text-2xl font-bold text-destructive">Product not found</h1>
                    <Link href="/" passHref>
                        <Button variant="link" className="mt-4">
                            <ArrowLeft className="me-2 h-4 w-4" /> Go back to Home
                        </Button>
                    </Link>
                </div>
            </main>
             <Footer
                appName={t('appName')}
                legal={t('legal')}
            />
        </div>
    );
  }

  const localizedProduct = {
      ...product,
      name: product.name[language],
      description: product.description[language],
      longDescription: product.longDescription[language],
  };
  
  const headerProps = {
    navLinks: t('navLinks') as { name: string; id: string }[],
    langToggle: t('langToggle') as string, 
    appName: t('appName') as string
  };


  return (
    <div className="flex min-h-screen flex-col" dir={dir}>
      <CartSidebar />
       <Header {...headerProps} />
      <main className="flex-1 py-12 md:py-20">
        <section>
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="flex flex-col gap-4">
                <div className="aspect-square relative rounded-xl overflow-hidden shadow-lg">
                    {localizedProduct.images.map((image, index) => (
                        <Image
                            key={image.id}
                            src={image.imageUrl}
                            alt={`${localizedProduct.name} - image ${index + 1}`}
                            fill
                            className={cn(
                                "object-cover transition-opacity duration-500",
                                index === activeIndex ? "opacity-100" : "opacity-0"
                            )}
                            data-ai-hint={image.imageHint}
                        />
                    ))}
                     <div className="absolute inset-0 flex items-center justify-between px-2">
                        <Button size="icon" variant="ghost" className="rounded-full bg-background/50 hover:bg-background/80" onClick={prevImage}>
                            <ChevronLeft />
                        </Button>
                        <Button size="icon" variant="ghost" className="rounded-full bg-background/50 hover:bg-background/80" onClick={nextImage}>
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
                <div className="flex gap-2 justify-center">
                    {localizedProduct.images.map((image, index) => (
                        <button
                            key={image.id}
                            onClick={() => setActiveIndex(index)}
                            className={cn(
                                "w-16 h-16 rounded-md overflow-hidden border-2 transition",
                                index === activeIndex ? "border-primary" : "border-transparent"
                            )}
                        >
                            <Image
                                src={image.imageUrl}
                                alt={`thumbnail ${index+1}`}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                             />
                        </button>
                    ))}
                </div>
              </div>

              <div className="flex flex-col h-full">
                <Link href="/#products" passHref>
                    <Button variant="ghost" className="mb-4 self-start px-0">
                        <ArrowLeft className="me-2 h-4 w-4" />
                        {language === 'ar' ? 'العودة إلى المنتجات' : 'Back to Products'}
                    </Button>
                </Link>
                <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">
                  {localizedProduct.name}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">{localizedProduct.description}</p>
                
                <div className="mt-6 text-base text-foreground space-y-4 whitespace-pre-line">
                   {localizedProduct.longDescription}
                </div>

                <div className="mt-auto pt-6">
                    <div className="text-2xl font-bold text-primary mb-4">
                        <p>SAR: {localizedProduct.prices.sar.toFixed(2)}</p>
                        <p>AED: {localizedProduct.prices.aed.toFixed(2)}</p>
                        <p>KWD: {localizedProduct.prices.kwd.toFixed(2)}</p>
                    </div>
                     <div className="flex gap-2">
                        <Button size="lg" className="w-full text-lg py-6" onClick={handleAddToCart}>
                            <ShoppingCart className="me-2"/>
                            {t('addToCart')}
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg py-6" onClick={handleFavoriteClick}>
                            <Heart className={cn("me-2", isFavorite && "fill-destructive text-destructive")} />
                        </Button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer
        appName={t('appName')}
        legal={t('legal')}
      />
    </div>
  );
}
