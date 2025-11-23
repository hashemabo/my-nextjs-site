'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dictionary } from '@/lib/dictionary';

const GuaranteeSection: React.FC = () => {
    const { language } = useLanguage();
    const t = (key: keyof typeof dictionary) => dictionary[key]?.[language] || key;

    return (
        <section id="guarantee" className="bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <Card className="bg-card border-2 border-accent shadow-lg max-w-4xl mx-auto">
                    <CardContent className="p-6 md:p-10 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground mb-4">
                            <ShieldCheck className="h-8 w-8" />
                        </div>
                        <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary">
                            {t('guaranteeTitle')}
                        </h2>
                        <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                           {t('guaranteeDescription')}
                        </p>
                        <div className="mt-6 font-semibold text-primary bg-accent/20 inline-block px-4 py-2 rounded-full">
                           {t('guaranteeTagline')}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default GuaranteeSection;
