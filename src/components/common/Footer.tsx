'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  appName: string;
  legal: string;
}

const Footer: React.FC<FooterProps> = ({ appName, legal }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-6 md:py-8 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div>
            <h3 className="font-headline text-lg md:text-xl font-bold">{appName}</h3>
            <p className="mt-2 text-xs md:text-sm text-secondary-foreground/80">
              © {year} {appName}. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="mt-6 md:mt-8 border-t border-secondary-foreground/10 pt-4 text-center text-xs md:text-sm text-secondary-foreground/60">
           <Link href="/terms" className="hover:text-accent">
            {legal}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;