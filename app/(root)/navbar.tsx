"use client";

import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Navbar() {
    return (
        <nav className="w-full flex h-[120px] items-center justify-between px-8 py-4 border-b">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/assets/logo-arabic.png"
                    alt="Tijan Logo"
                    width={130}
                    height={100}
                />
            </Link>

            {/* Links */}
            <div className="hidden md:flex items-center gap-8">
                <Link
                    href="/about"
                    className="hover:opacity-70 transition text-2xl text-[var(--primary-color)] font-bold"
                >
                    About
                </Link>
                <Link
                    href="/how-it-works"
                    className="hover:opacity-70 transition text-2xl text-[var(--primary-color)] font-bold"
                >
                    How to use
                </Link>
                <Link
                    href="/pricing"
                    className="hover:opacity-70 transition text-2xl text-[var(--primary-color)] font-bold"
                >
                    Pricing
                </Link>
            </div>

            {/* Sign in Button */}
            <Link href="/login">
                <Button>Log in</Button>
            </Link>
        </nav>
    );
}
