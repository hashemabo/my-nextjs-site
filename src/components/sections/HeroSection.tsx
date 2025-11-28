'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-main');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.25);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] md:h-[80vh] md:min-h-[600px] w-full flex items-center justify-center text-center text-white p-0 overflow-hidden">

      {/* Parallax Background */}
      {heroImage && (
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${offset}px) scale(1.15)`,
            transition: "transform 0.1s linear"
          }}
        >
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            className="object-cover brightness-[0.55]"
            data-ai-hint={heroImage.imageHint}
          />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-shadow-lg animate-fade-in-down leading-tight md:leading-snug">
          ارتقِ برجولتك…  
          <span className="text-accent block mt-2 text-2xl md:text-4xl lg:text-5xl">واجعل حضورك لا يُنسى</span>
        </h1>

        <p className="mt-4 text-sm md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up whitespace-pre-line leading-relaxed">
أقوى المنتجات الرجالية الأصلية في مكان واحد
✔ كريمات للانتصاب
✔ كريمات للتأخير  
✔ كريمات للتضخيم
✔ كريمات طاقة وتحفيز
✔ بخاخ فيجا
⭐️ نتائج سريعة
✔ جودة مضمونة
✔ توصيل سريع لجميع الدول
        </p>

        <Button
          size="lg"
          className="mt-6 md:mt-8 bg-accent text-accent-foreground hover:bg-accent/90 text-base md:text-lg font-bold px-6 md:px-10 py-4 md:py-6 rounded-xl shadow-xl shadow-accent/30 transition-all duration-300"
          onClick={scrollToProducts}
        >
          اكتشف مجموعتنا
          <ArrowDown className="ms-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;