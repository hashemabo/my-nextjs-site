'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dictionary } from '@/lib/dictionary';
import { useDailyDeal } from '@/hooks/useDailyDeal';
import { products } from '@/lib/data';

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

// ⭐ فقّاعة تتبع الماوس / اللمس
import MouseFollowerBubble from "@/components/common/MouseFollowerBubble";


export default function Home() {
  const { language, dir } = useLanguage();
  const [showDealPopup, setShowDealPopup] = useState(false);

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
      longDescription:
        product.longDescription?.[language] ||
        product.longDescription?.ar ||
        '',
    }));
  }, [language]);

  const { dealProduct } = useDailyDeal(localizedProducts);

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

      {/* ⭐ فقّاعة تتبع الماوس */}
      <MouseFollowerBubble />

      {/* ⭐ البنر العلوي */}
      <TopFloatingBadge />

      {/* ⭐ البنر الجانبي */}
      <SideBannerRecommendations />

      <main className="flex-1">
        <HeroSection {...heroProps} />
        <RecommendedProductsSection />
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
