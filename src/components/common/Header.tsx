'use client';

import React from 'react';
import { Languages, Menu, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import Link from 'next/link';

interface HeaderProps {
  appName: string;
  navLinks: { name: string; id: string }[];
  langToggle: string;
}

const Header: React.FC<HeaderProps> = ({ appName, navLinks, langToggle }) => {
  const { toggleLanguage } = useLanguage();
  const { cart, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (window.location.pathname !== '/') {
        window.location.href = `/#${id}`;
        return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const NavLinks = ({ inSheet = false }: { inSheet?: boolean }) => (
    <nav className={`flex items-center gap-4 ${inSheet ? 'flex-col space-y-4' : 'hidden md:flex'}`}>
      {navLinks.map((link) => {
         const NavButton = (
            <Button
              key={link.id}
              variant="ghost"
              className="text-base font-medium"
              onClick={(e) => scrollToSection(link.id, e)}
              asChild
            >
             <a href={`#${link.id}`}>{link.name}</a>
            </Button>
          );
        
        if (inSheet) {
          return <SheetClose key={link.id} asChild>{NavButton}</SheetClose>;
        }
        
        return NavButton;
      })}
      <Button variant="outline" onClick={toggleLanguage} className="text-base font-medium">
        <Languages className="me-2 h-5 w-5" />
        {langToggle}
      </Button>
    </nav>
  );

  return (
    <header id="home" className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-sm border-b' : 'bg-transparent'}`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" passHref className="font-headline text-2xl font-bold text-primary" onClick={(e) => scrollToSection('home', e)}>
          {appName}
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <NavLinks />
           <Button variant="outline" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
             {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
           <Button variant="outline" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col items-center justify-center h-full">
                 <SheetClose asChild>
                    <Link href="/" passHref className="font-headline text-2xl font-bold text-primary mb-8" onClick={(e) => scrollToSection('home', e)}>
                      {appName}
                    </Link>
                 </SheetClose>
                <NavLinks inSheet />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
