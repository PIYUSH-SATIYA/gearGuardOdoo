import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { initializeDatabase } from "@/src/db/init";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Gear Guard",
    description: "Equipment management system",
};

// Initialize database connection on server startup
if (typeof window === "undefined") {
    initializeDatabase().catch((error) => {
        console.error("Failed to initialize database:", error);
    });
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
