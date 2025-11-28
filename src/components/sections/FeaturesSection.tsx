'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { features } from '@/lib/data';
import { dictionary } from '@/lib/dictionary';

const FeaturesSection: React.FC = () => {
  const { language } = useLanguage();
  const t = (key: keyof typeof dictionary) => dictionary[key]?.[language] || key;

  const localizedFeatures = features.map((feature) => ({
    ...feature,
    title: feature.title[language] || feature.title.ar,
    description: feature.description[language] || feature.description.ar,
  }));

  return (
    <section id="features" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
            {t('featuresTitle')}
          </h2>
        </div>
        <div className="mt-8 md:mt-12 grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-2">
          {localizedFeatures.map((feature, index) => (
            <Card key={index} className="text-center bg-card border-2 border-transparent hover:border-accent hover:shadow-lg transition-all duration-300 p-4 md:p-6">
              <CardHeader className="p-0">
                <div className="mx-auto flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-accent text-accent-foreground mb-3 md:mb-4">
                  <feature.icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <CardTitle className="text-lg md:text-xl font-bold">{feature.title}</CardTitle>
                <CardDescription className="mt-2 text-sm md:text-base text-muted-foreground">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;