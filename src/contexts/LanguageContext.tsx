'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  dir: Direction;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // ✅ الإصلاح: تهيئة الحالة بناءً على localStorage أو الافتراضي
  const [language, setLanguage] = useState<Language>('ar');
  const [dir, setDir] = useState<Direction>('rtl');
  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ الإصلاح: تحميل اللغة المحفوظة مرة واحدة عند التحميل
  useEffect(() => {
    // هذا يضمن أننا في بيئة العميل فقط
    if (typeof window !== 'undefined') {
      try {
        const savedLanguage = localStorage.getItem('preferred-language') as Language;
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
          setLanguage(savedLanguage);
          setDir(savedLanguage === 'ar' ? 'rtl' : 'ltr');
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
        // نستمر باللغة الافتراضية في حالة الخطأ
      } finally {
        setIsInitialized(true);
      }
    } else {
      // على الخادم، نضع initialized مباشرة
      setIsInitialized(true);
    }
  }, []);

  // ✅ الإصلاح: حفظ التفضيل عند تغيير اللغة
  useEffect(() => {
    if (typeof window !== 'undefined' && isInitialized) {
      try {
        localStorage.setItem('preferred-language', language);
      } catch (error) {
        console.error('Error saving language preference:', error);
      }
    }
  }, [language, isInitialized]);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    const newDir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    
    setLanguage(newLanguage);
    setDir(newDir);
  };

  // ✅ الإصلاح: منع التضارب بتأكيد التهيئة
  const contextValue = React.useMemo(() => ({
    language: isInitialized ? language : 'ar',
    dir: isInitialized ? dir : 'rtl',
    toggleLanguage
  }), [language, dir, isInitialized]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};