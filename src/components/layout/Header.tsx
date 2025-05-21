"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Briefcase, Target, Users, HomeIcon, ShoppingBag } from 'lucide-react'; // Added ShoppingBag for Products
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/products', label: 'Products', icon: ShoppingBag },
  { href: '/mission', label: 'Mission', icon: Target },
  { href: '/careers', label: 'Careers', icon: Briefcase },
  { href: '/about', label: 'About Us', icon: Users },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!isMounted) {
    return null; // Avoid rendering on server to prevent hydration mismatch for mobile menu logic
  }

  return (
    <header className="bg-background/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
          ASPENOVA
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "text-foreground hover:bg-accent/50 hover:text-accent-foreground",
                pathname === item.href && "bg-accent/80 text-accent-foreground font-semibold"
              )}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background shadow-lg border-t z-40">
          <nav className="flex flex-col space-y-1 p-4">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                asChild
                className={cn(
                  "w-full justify-start text-lg py-3",
                  pathname === item.href && "bg-accent/80 text-accent-foreground font-semibold"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href={item.href}>
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
