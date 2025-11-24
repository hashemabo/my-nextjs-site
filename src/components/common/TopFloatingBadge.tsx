'use client';

import React, { useEffect, useState } from 'react';
import { Truck, BadgeCheck, Clock, Gift } from 'lucide-react';

export default function TopFloatingBadge() {
  const [visible, setVisible] = useState(true);
  const [isGlowing, setIsGlowing] = useState(true);

  // تأثير النبض
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // الإخفاء عند التمرير
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY <= lastY || currentY < 100);
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-all duration-500 
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}
      `}
    >
      <div className={`
        bg-gradient-to-br from-black/80 to-gray-900/90 
        backdrop-blur-xl text-white rounded-xl 
        shadow-2xl border border-white/20 
        p-5 flex flex-col gap-3 w-56
        transition-all duration-500
        ${isGlowing ? 'shadow-green-500/30' : 'shadow-blue-500/30'}
        hover:scale-105
      `}>
        
        {/* البنود الأساسية */}
        <div className="flex items-center gap-3">
          <Gift className="w-5 h-5 text-green-400 flex-shrink-0" />
          <div>
            <p className="font-bold text-white text-sm">الشحن مجاني</p>
            <p className="text-xs text-green-300">لجميع الطلبات</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <div>
            <p className="font-bold text-white text-sm">الشحن داخل الخليج</p>
            <p className="text-xs text-blue-300">توصيل سريع</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BadgeCheck className="w-5 h-5 text-purple-400 flex-shrink-0" />
          <div>
            <p className="font-bold text-white text-sm">منتجات أصلية</p>
            <p className="text-xs text-purple-300">ضمان الجودة</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          <div>
            <p className="font-bold text-white text-sm">توصيل سريع</p>
            <p className="text-xs text-yellow-300">24-48 ساعة</p>
          </div>
        </div>

      </div>
    </div>
  );
}