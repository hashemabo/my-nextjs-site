'use client';

import { useEffect, useState } from "react";
import { Truck } from "lucide-react";

export default function FloatingShippingBadge() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // يظهر عند النزول – يختفي عند الصعود
      if (window.scrollY > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        fixed top-6 right-6 z-[9999]
        transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
      `}
    >
      <div className="
        bg-white/20 backdrop-blur-md 
        shadow-xl border border-white/30
        text-white font-bold text-sm
        px-5 py-4 rounded-full
        flex items-center gap-3
        animate-bounce-slow
      ">
        <Truck className="w-5 h-5 text-white" />

        <div className="text-xs leading-tight">
          🚚 الشحن داخل الخليج <br />
          الدفع عند الاستلام – توصيل سريع
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>
    </div>
  );
}
