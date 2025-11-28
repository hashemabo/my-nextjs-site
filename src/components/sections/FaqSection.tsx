'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { faqs } from '@/lib/data';
import { dictionary } from '@/lib/dictionary';

const FaqSection: React.FC = () => {
  const { language } = useLanguage();
  const t = (key: keyof typeof dictionary) => dictionary[key][language];

  return (
    <section id="faq" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
            {t('faqTitle')}
          </h2>
        </div>
        <div className="mt-8 md:mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-base md:text-lg font-bold text-start">{faq.question[language]}</AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground">
                  {faq.answer[language]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;