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

  // إظهار وإخفاء عند التمرير
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
      className={`fixed left-3 top-1/2 -translate-y-1/2 z-50 
      transition-all duration-500
      ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
    `}
    >
      <div
        className={`
          bg-gradient-to-br from-black/80 to-gray-900/90
          backdrop-blur-xl text-white rounded-xl
          shadow-2xl border border-white/20
          p-3 flex flex-col gap-3
          w-40   /* ← أرفع */
          transition-all duration-500
          ${isGlowing ? 'shadow-green-500/30' : 'shadow-blue-500/30'}
          hover:scale-105
        `}
      >

        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-green-400" />
          <div>
            <p className="font-bold text-xs text-white">الشحن مجاني</p>
            <p className="text-[10px] text-green-300">لجميع الطلبات</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-blue-400" />
          <div>
            <p className="font-bold text-xs text-white">الشحن داخل الخليج</p>
            <p className="text-[10px] text-blue-300">توصيل سريع</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <BadgeCheck className="w-5 h-5 text-purple-400" />
          <div>
            <p className="font-bold text-xs text-white">منتجات أصلية</p>
            <p className="text-[10px] text-purple-300">ضمان الجودة</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-yellow-400" />
          <div>
            <p className="font-bold text-xs text-white">توصيل سريع</p>
            <p className="text-[10px] text-yellow-300">24-48 ساعة</p>
          </div>
        </div>

      </div>
    </div>
  );
}
