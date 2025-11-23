'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, buttonText }) => {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-main');

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center text-center text-white p-0">
      {heroImage && (
         <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
      )}
      
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-shadow-lg animate-fade-in-down">
          {title}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up">
          {subtitle}
        </p>
        <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold px-10 py-6" onClick={scrollToProducts}>
          {buttonText}
          <ArrowDown className="ms-2 h-5 w-5"/>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
