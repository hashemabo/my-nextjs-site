'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { dictionary } from '@/lib/dictionary';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCart, Clock } from 'lucide-react';
import type { Product } from '@/lib/data';

// ⭐ عدلي الـ interface ليكون متوافقاً مع التعديلات
interface LocalizedProduct extends Product {
  displayName?: string;
  displayDescription?: string;
  displayLongDescription?: string;
}

interface DealPopupProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  product: LocalizedProduct;
  addToCartText: string;
  endsInText: string;
}

const CountdownTimer = ({ endsInText }: { endsInText: string }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
            const difference = endOfDay.getTime() - now.getTime();

            if (difference > 0) {
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ hours, minutes, seconds });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial call

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time: number) => time.toString().padStart(2, '0');

    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{endsInText}:</span>
            <span className="font-mono font-semibold text-primary">{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</span>
        </div>
    );
};

const DealPopup: React.FC<DealPopupProps> = ({ isOpen, setIsOpen, title, product, addToCartText, endsInText }) => {
  const { language } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart();
  const { toast } = useToast();
  const t = (key: keyof typeof dictionary) => dictionary[key][language];

  const handleAddToCart = () => {
    addToCart(product);
    toast({
        title: t('addToCartSuccess'),
        description: product.name,
    });
    setIsOpen(false);
    setIsCartOpen(true);
  };
  
  const originalPrice = product.prices.sar;
  const discountedPrice = originalPrice * 0.8; // 20% discount

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 max-w-2xl overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {product.name} is on sale for SAR {discountedPrice.toFixed(2)}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 items-center">
            <div className="p-6 md:p-8 order-2 md:order-1">
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary">
                    {title}
                </h2>
                <h3 className="mt-2 text-xl font-bold text-foreground">{product.name}</h3>
                <div className="my-4">
                    <span className="text-2xl font-bold text-primary me-3">SAR {discountedPrice.toFixed(2)}</span>
                    <span className="text-lg text-muted-foreground line-through">SAR {originalPrice.toFixed(2)}</span>
                     <span className="ms-3 text-xs font-semibold text-destructive-foreground bg-destructive rounded-full px-2 py-0.5">20% OFF</span>
                </div>
                <div className="flex items-center gap-4 mt-4">
                    <Button size="lg" onClick={handleAddToCart}>
                        <ShoppingCart className="me-2 h-5 w-5"/>
                        {addToCartText}
                    </Button>
                    <CountdownTimer endsInText={endsInText} />
                </div>
            </div>
            <div className="aspect-square relative order-1 md:order-2">
                 <Image
                    src={product.images[0].imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={product.images[0].imageHint}
                />
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DealPopup;