'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { dictionary } from '@/lib/dictionary';

export default function FaqSection() {
  const { language } = useLanguage();
  
  const t = (key: keyof typeof dictionary) => dictionary[key]?.[language] || key;

  const faqs = [
    {
      question: t('faqShippingPrivacy'),
      answer: t('faqShippingPrivacyAnswer')
    },
    {
      question: t('faqShippingCountries'),
      answer: t('faqShippingCountriesAnswer')
    },
    {
      question: t('faqProductAuthenticity'),
      answer: t('faqProductAuthenticityAnswer')
    },
    {
      question: t('faqHowToOrder'),
      answer: t('faqHowToOrderAnswer')
    },
    {
      question: t('faqPaymentMethods'),
      answer: t('faqPaymentMethodsAnswer')
    },
    {
      question: t('faqDeliveryTime'),
      answer: t('faqDeliveryTimeAnswer')
    },
    {
      question: t('faqReturns'),
      answer: t('faqReturnsAnswer')
    }
  ];

  return (
    <section id="faq" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          {t('faqTitle')}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold text-right hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}