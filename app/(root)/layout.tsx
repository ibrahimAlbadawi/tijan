import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./navbar";

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
    description: "Main page | الصفحة الرئيسية",
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
                <Navbar />
                {children}
            </body>
        </html>
    );
}
