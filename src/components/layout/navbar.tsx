
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#ai-tools', label: 'AI Tools' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center" passHref>
            <Image
              src="https://storage.googleapis.com/scrumming_it_web_0/scrumming_it_logo_1.png"
              alt="ScrummingIT Logo"
              width={150}
              height={30}
              data-ai-hint="logo brand"
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} passHref>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  {link.label}
                </Button>
              </Link>
            ))}
            <ThemeToggleButton />
          </nav>
          <div className="md:hidden flex items-center">
            <ThemeToggleButton />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="ml-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} passHref>
                       <Button variant="ghost" className="w-full justify-start text-lg">
                         {link.label}
                       </Button>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

