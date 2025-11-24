'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Truck, ShieldCheck, Package } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Lock,
      title: 'خصوصية وسرية تامة',
      description: 'طلباتك هي سرك الخاص. نضمن لك السرية التامة بنسبة 100٪.'
    },
    {
      icon: Truck,
      title: 'شحن سريع لدول الخليج',
      description: 'استلم طلبك بسرعة وسرية في أي مكان في الخليج.'
    },
    {
      icon: ShieldCheck,
      title: 'منتجات أصلية وموثوقة',
      description: 'فقط المنتجات الأصلية والمختبرة معمليًا لراحة بالك.'
    },
    {
      icon: Package,
      title: 'تغليف غير ظاهر للمحتويات',
      description: 'تغليفنا بسيط وغير مميز، مما يضمن احترام خصوصيتك.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">

        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            لماذا تختارنا؟
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* العناصر */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.06,
                boxShadow: "0 15px 40px rgba(0,0,0,0.15)"
              }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-md relative group"
            >
              {/* خلفية متحركة */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>

              {/* الأيقونة */}
              <motion.div
                variants={iconVariants}
                className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-all duration-500"
              >
                <item.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* العنوان */}
              <h3 className="relative z-10 text-xl font-bold mb-2 text-gray-900 group-hover:text-gray-800">
                {item.title}
              </h3>

              {/* الوصف */}
              <p className="relative z-10 text-gray-600 group-hover:text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
