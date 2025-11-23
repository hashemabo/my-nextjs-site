import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/contexts/CartContext';
import AnnouncementBar from '@/components/common/AnnouncementBar';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Falcon Force | قوة الصقر',
  description: 'Luxury and discretion for the modern man.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;0,700;1,400&family=Belleza&display=swap" rel="stylesheet" />
        
        {/* --- Google Analytics --- */}
        {/*
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID`}
          />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'YOUR_GA_ID');
            `}
          </Script>
        */}

        {/* --- Meta Pixel --- */}
        {/*
          <Script id="meta-pixel">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img height="1" width="1" style={{display: 'none'}}
              src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
            />
          </noscript>
        */}
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <CartProvider>
            <AnnouncementBar />
            {children}
            <Toaster />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
