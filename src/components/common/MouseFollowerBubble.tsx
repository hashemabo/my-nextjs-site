'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MouseFollowerBubble() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [idle, setIdle] = useState(false);

  // 🔥 تتبع حركة الماوس + اللمس + Idle
  useEffect(() => {
    let idleTimeout: any;

    const move = (e: any) => {
      setIdle(false);
      clearTimeout(idleTimeout);

      idleTimeout = setTimeout(() => setIdle(true), 2000);

      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;

      setPosition({ x, y });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
    };
  }, []);

  return (
    <motion.div
      animate={{
        x: position.x - 40,
        y: position.y - 40,
        scale: idle ? 1.15 : 1
      }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
    >
      {/* ⭐ دائرة شفافة بحواف فقط */}
      <div
        className="
          w-20 h-20 
          rounded-full 
          flex items-center justify-center
          backdrop-blur-xl
          relative
        "
        style={{
          border: "3px solid rgba(255,255,255,0.5)",
          boxShadow: "0 0 15px rgba(255,255,255,0.25)",
          background: "rgba(0,0,0,0.0)", // شفاف تمامًا
        }}
      >
        {/* ⭐ كلمة شحن مجاني */}
        <span
          className="text-white text-xs font-bold pointer-events-none select-none"
          style={{ opacity: 0.9 }}
        >
          شحن مجاني
        </span>

        {/* ⭐ تأثير نبض فاخر عند الـ Idle */}
        {idle && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "3px solid rgba(255,255,255,0.3)" }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}
