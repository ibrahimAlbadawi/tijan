import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Tijan | تيجان",
    description: "Title for Tijan website.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    //link to harir display font
    return (
        <html lang="en">
            <head>
                <link
                    href="https://db.onlinewebfonts.com/c/0caeb4a9b74dbb6ebf362c2cc8b6ee84?family=Harir+Display"
                    rel="stylesheet"
                ></link>
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
