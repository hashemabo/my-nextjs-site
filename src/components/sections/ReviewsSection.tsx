
'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Star, StarHalf } from 'lucide-react';
import { reviews } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';
import { dictionary } from '@/lib/dictionary';


const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex text-accent">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" className="h-5 w-5" />
      ))}
      {halfStar && <StarHalf key="half" fill="currentColor" className="h-5 w-5" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5" />
      ))}
    </div>
  );
};

const ReviewsSection: React.FC = () => {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const { language } = useLanguage();
  const t = (key: keyof typeof dictionary) => dictionary[key]?.[language] || key;

  const localizedReviews = reviews.map(review => ({
      ...review,
      review: review.review[language] || review.review.ar,
  }));

  return (
    <section id="reviews" className="bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">{t('reviewsTitle')}</h2>
        </div>
        <div className="mt-12">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: 'start',
              loop: true,
              direction: language === 'ar' ? 'rtl' : 'ltr',
            }}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {localizedReviews.map((review, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                        <Image
                          src={review.avatar.imageUrl}
                          alt={review.name}
                          width={80}
                          height={80}
                          className="rounded-full mb-4"
                          data-ai-hint={review.avatar.imageHint}
                        />
                        <p className="text-muted-foreground italic flex-grow">"{review.review}"</p>
                        <div className="mt-4 flex items-center gap-2">
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="mt-2 font-bold">{review.name}</p>
                        <p className="text-sm text-muted-foreground">{review.location}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
