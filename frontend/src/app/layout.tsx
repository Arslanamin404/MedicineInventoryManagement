import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/appSidebar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Darul Sihha Pharmacy",
  description: "Darul Sihha Pharmacy Chemists & Druggists POS software",
};

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
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen">
            <AppSidebar />
          </div>
          <div className="flex flex-col flex-1">
            <Header />
            <main className="bg-gradient-to-br from-green-50 to-white">
              <SidebarTrigger />
              {children}
              <Toaster position="top-right" richColors />
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
