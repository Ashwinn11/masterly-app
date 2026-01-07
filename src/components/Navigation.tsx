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
const backgroundImage = "/background1.png";

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
      <div className="flex items-center gap-2">
        <img 
          src="/icon.png"
          alt="Masterly AI"
          className={cn("w-10 h-10 object-contain transition-all duration-300 hover:scale-105 rounded-xl", className)}
        />
        {showText && (
          <span className="text-xl font-bold text-foreground tracking-tight">Masterly AI</span>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 bg-card border-b-[3px] border-foreground/10 shadow-sm",
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
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium transition-colors text-foreground/90 hover:text-foreground"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button / User Menu */}
            <div className="hidden md:flex items-center gap-2">
              {loading ? (
                <div className="h-9 w-20 animate-pulse bg-muted/20 rounded-md" />
              ) : user ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <User className="h-4 w-4" />
                        Account
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-card border-[3px] border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] rounded-xl">
                      <DropdownMenuItem asChild className="font-handwritten font-bold text-lg hover:bg-muted focus:bg-muted">
                        <Link href="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-foreground/10" />
                      <DropdownMenuItem onClick={signOut} className="cursor-pointer text-secondary font-handwritten font-bold text-lg hover:bg-muted focus:bg-muted">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button variant="default" size="sm" asChild>
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
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card border-l-[4px] border-foreground/10">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex flex-col space-y-6 mt-8">
                    {/* Mobile Logo */}
                    <div className="flex items-center">
                      <Logo />
                    </div>

                    {/* Mobile Navigation Links */}
                    <nav className="flex flex-col space-y-4">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-2xl font-black text-foreground hover:text-primary transition-colors text-left font-handwritten"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </nav>

                    {/* Mobile Auth Buttons */}
                    <div className="pt-4 border-t border-foreground/10 space-y-4 font-handwritten">
                      {loading ? (
                        <div className="h-12 w-full animate-pulse bg-muted/20 rounded-xl" />
                      ) : user ? (
                        <>
                          <Button variant="default" size="lg" className="w-full text-xl h-14" asChild>
                            <Link href="/dashboard">
                              <LayoutDashboard className="h-5 w-5 mr-2" />
                              Dashboard
                            </Link>
                          </Button>
                          <Button variant="outline" size="lg" className="w-full text-xl h-14" asChild>
                            <Link href="/profile">
                              <User className="h-5 w-5 mr-2" />
                              Profile
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="lg"
                            className="w-full text-secondary hover:text-secondary/90 text-xl font-black"
                            onClick={signOut}
                          >
                            <LogOut className="h-5 w-5 mr-2" />
                            Sign Out
                          </Button>
                        </>
                      ) : (
                        <Button variant="default" size="lg" className="w-full text-xl h-14" asChild>
                          <Link href="/login">Get Started</Link>
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