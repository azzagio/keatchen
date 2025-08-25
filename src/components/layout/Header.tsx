"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { ShoppingCart } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm shadow-neumo-light dark:shadow-neumo-dark">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="shadow-neumo-light dark:shadow-neumo-dark hover:shadow-neumo-light-inset dark:hover:shadow-neumo-dark-inset rounded-full">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
          </Button>
          <Link href="/login">
            <Button variant="secondary" className="hidden sm:inline-flex shadow-neumo-light dark:shadow-neumo-dark hover:shadow-neumo-light-inset dark:hover:shadow-neumo-dark-inset">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button className="shadow-neumo-light dark:shadow-neumo-dark hover:shadow-neumo-light-inset dark:hover:shadow-neumo-dark-inset">Sign Up</Button>
          </Link>
           <Link href="/profile/cook">
             <Button variant="ghost" size="sm" className="hidden sm:inline-flex">For Cooks</Button>
           </Link>
        </div>
      </div>
    </header>
  );
}
