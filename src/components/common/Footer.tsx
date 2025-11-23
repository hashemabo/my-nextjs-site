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
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-headline text-xl font-bold">{appName}</h3>
            <p className="mt-2 text-sm text-secondary-foreground/80">
              © {year} {appName}. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-secondary-foreground/10 pt-4 text-center text-sm text-secondary-foreground/60">
           <Link href="/terms" className="hover:text-accent">
            {legal}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
