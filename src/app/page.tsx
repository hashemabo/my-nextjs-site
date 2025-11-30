'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dictionary } from '@/lib/dictionary';
import { useDailyDeal } from '@/hooks/useDailyDeal';
import { products } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import Header from '@/components/common/Header';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import RecommendedProductsSection from '@/components/sections/RecommendedProductsSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import GuaranteeSection from '@/components/sections/GuaranteeSection';
import FaqSection from '@/components/sections/FaqSection';
import Footer from '@/components/common/Footer';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import CartSidebar from '@/components/common/CartSidebar';
import DealPopup from '@/components/common/DealPopup';

// ⭐ البنر الجانبي
import SideBannerRecommendations from "@/components/sections/SideBannerRecommendations";

// ⭐ البنر الدائري العلوي
import TopFloatingBadge from "@/components/common/TopFloatingBadge";

// ⭐ قسم لماذا تختارنا الجديد
import WhyChooseUs from "@/components/sections/WhyChooseUs";

// ⭐ قسم جميع المنتجات
import AllProductsSection from "@/components/sections/AllProductsSection";

export default function Home() {
  const { language, dir } = useLanguage();
  const [showDealPopup, setShowDealPopup] = useState(false);
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const { toast } = useToast();

  const t = useCallback(
    (key: keyof typeof dictionary) =>
      dictionary[key]?.[language] || dictionary[key]?.ar || key,
    [language]
  );

  const localizedProducts = useMemo(() => {
    return products.map((product) => ({
      ...product,
      name: product.name[language] || product.name.ar,
      description: product.description[language] || product.description.ar,
      longDescription: product.longDescription?.[language] || product.longDescription?.ar || '',
      originalName: product.name,
      originalDescription: product.description,
    }));
  }, [language]);

  const { dealProduct } = useDailyDeal(localizedProducts);

  // ✅ حساب إجمالي السلة
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + (item.prices.sar * item.quantity);
    }, 0);
  }, [cart]);

  // ✅ حساب عدد العناصر في السلة
  const cartItemsCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  // ✅ دالة إضافة منتج للسلة
  const handleAddToCart = useCallback((product: any) => {
    const localizedProduct = {
      ...product,
      name: product.name,
      description: product.description,
      longDescription: product.longDescription,
    };

    addToCart(localizedProduct, 1, 'sar');

    toast({
      title: t("addToCartSuccess"),
      description: product.name,
    });
  }, [addToCart, toast, t]);

  // ✅ دالة زيادة الكمية
  const handleIncreaseQuantity = useCallback((productId: string) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  }, [cart, updateQuantity]);

  // ✅ دالة تقليل الكمية
  const handleDecreaseQuantity = useCallback((productId: string) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
      if (item.quantity > 1) {
        updateQuantity(productId, item.quantity - 1);
      } else {
        removeFromCart(productId);
        toast({
          title: t("removeFromCartSuccess"),
          description: t("productRemovedFromCart"),
        });
      }
    }
  }, [cart, updateQuantity, removeFromCart, toast, t]);

  // ✅ الحصول على كمية منتج معين في السلة
  const getProductQuantity = useCallback((productId: string) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }, [cart]);

  useEffect(() => {
    setShowDealPopup(true);

    const timer = setTimeout(() => {
      setShowDealPopup(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const headerProps = {
    navLinks: t('navLinks'),
    langToggle: t('langToggle'),
    appName: t('appName'),
  };

  const heroProps = {
    title: t('heroTitle'),
    subtitle: t('heroSubtitle'),
    buttonText: t('heroButton'),
  };

  return (
    <div className="flex min-h-screen flex-col" dir={dir}>
      {dealProduct && (
        <DealPopup
          isOpen={showDealPopup}
          setIsOpen={setShowDealPopup}
          product={dealProduct}
          title={t('dealOfTheDayTitle')}
          addToCartText={t('addToCart')}
          endsInText={t('dealEndsIn')}
        />
      )}

      <CartSidebar dealProduct={dealProduct} />

      <Header {...headerProps} />

      {/* ⭐ البنر العلوي مع عداد السلة */}
      <TopFloatingBadge 
        cartItemsCount={cartItemsCount}
        cartTotal={cartTotal}
      />

      {/* ⭐ البنر الجانبي */}
      <SideBannerRecommendations />

      <main className="flex-1">
        <HeroSection {...heroProps} />
        
        {/* ✅ قسم المنتجات الموصى بها (3 منتجات عشوائية) */}
        
        {/* ✅ قسم جميع المنتجات */}
        <AllProductsSection 
          products={localizedProducts}
          onAddToCart={handleAddToCart}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
          getProductQuantity={getProductQuantity}
        />
        
        <FeaturesSection />
        <ReviewsSection />
        <GuaranteeSection />
        <FaqSection />
      </main>

      <Footer appName={t('appName')} legal={t('legal')} />

      <ScrollToTopButton />
    </div>
  );
}