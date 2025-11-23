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
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
            {t('featuresTitle')}
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {localizedFeatures.map((feature, index) => (
            <Card key={index} className="text-center bg-card border-2 border-transparent hover:border-accent hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                <CardDescription className="mt-2 text-base text-muted-foreground">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
