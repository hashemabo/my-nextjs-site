'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const AnnouncementBar = () => {
    const { language } = useLanguage();
    
    const text = language === 'ar' 
        ? "شحن مجاني لجميع الطلبات اليوم فقط! 🚚✨"
        : "Free shipping on all orders today only! 🚚✨";

    return (
        <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm font-semibold">
            {text}
        </div>
    );
};

export default AnnouncementBar;
