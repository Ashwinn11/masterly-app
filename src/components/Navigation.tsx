'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  // Navigation links
  const navLinks = [
    { name: "Features", href: "/#features" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "FAQ", href: "/#faq" },
  ];

  // Handle scroll for background transparency
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logo Component - uses app icon.png with app name
  const Logo: React.FC<{ className?: string; showText?: boolean }> = ({ 
    className = "",
    showText = true
  }) => {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 border-crayon-sm bg-white p-1 transform rotate-[-2deg] hover:rotate-2 transition-transform shadow-sm">
          <img 
            src="/icon.png"
            alt="Masterly AI"
            className={cn("w-full h-full object-contain", className)}
          />
        </div>
        {showText && (
          <span className="text-2xl font-black text-foreground font-handwritten tracking-tight">Masterly AI</span>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 bg-paper-texture/80 backdrop-blur-md border-b-2 border-foreground/5 py-2",
          scrolled ? "shadow-md" : "",
          className
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xl font-black font-handwritten transition-all text-foreground/70 hover:text-primary hover:scale-110"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button / User Menu */}
            <div className="hidden md:flex items-center gap-4">
              {loading ? (
                <div className="h-10 w-24 animate-pulse bg-muted/20 rounded-xl" />
              ) : user ? (
                <>
                  <Button variant="default" size="sm" className="font-handwritten font-black text-lg" asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-5 w-5 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2 font-handwritten font-black text-lg border-crayon-sm px-4">
                        <User className="h-5 w-5" />
                        Account
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-paper-texture border-crayon shadow-xl p-2 font-handwritten">
                      <DropdownMenuItem asChild className="font-black text-xl p-3 hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">
                        <Link href="/profile">
                          <User className="mr-3 h-5 w-5" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-foreground/10" />
                      <DropdownMenuItem onClick={signOut} className="font-black text-xl p-3 text-secondary hover:bg-secondary/10 focus:bg-secondary/10 cursor-pointer">
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button variant="default" size="lg" className="font-handwritten font-black text-xl px-8 border-crayon-sm shadow-sm" asChild>
                  <Link href="/login">Get Started</Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                   <Button
                     variant="ghost"
                     size="icon"
                     className="transition-colors text-foreground hover:text-primary"
                   >
                    <Menu className="h-8 w-8" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-paper-texture border-l-4 border-foreground/10 p-0 overflow-hidden">
                  <div className="absolute inset-0 bg-notebook-paper opacity-20 pointer-events-none" />
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex flex-col h-full p-8 relative z-10">
                    {/* Mobile Logo */}
                    <div className="flex items-center mb-12">
                      <Logo />
                    </div>

                    {/* Mobile Navigation Links */}
                    <nav className="flex flex-col space-y-8 mb-auto">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-4xl font-black text-foreground hover:text-primary transition-all font-handwritten active:scale-95"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </nav>

                    {/* Mobile Auth Buttons */}
                    <div className="pt-8 border-t-2 border-dashed border-foreground/10 space-y-6 font-handwritten">
                      {loading ? (
                        <div className="h-14 w-full animate-pulse bg-muted/20 rounded-xl" />
                      ) : user ? (
                        <>
                          <Button variant="default" size="lg" className="w-full text-2xl h-16 border-crayon font-black" asChild>
                            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                              <LayoutDashboard className="h-6 w-6 mr-3" />
                              Dashboard
                            </Link>
                          </Button>
                          <Button variant="outline" size="lg" className="w-full text-2xl h-16 border-crayon font-black" asChild>
                            <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                              <User className="h-6 w-6 mr-3" />
                              Profile
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="lg"
                            className="w-full text-secondary hover:text-secondary/90 text-2xl font-black"
                            onClick={signOut}
                          >
                            <LogOut className="h-6 w-6 mr-3" />
                            Sign Out
                          </Button>
                        </>
                      ) : (
                        <Button variant="default" size="lg" className="w-full text-2xl h-16 border-crayon font-black shadow-lg" asChild>
                          <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navigation;