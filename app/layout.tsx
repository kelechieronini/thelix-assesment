import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "@/lib/providers";
import { Toaster } from "@/components/ui/toaster";

const unbounded = Unbounded({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thelix Assessment",
  description: "",
  icons: {
    icon: [
      {
        url: "https://thelixholdings.com/wp-content/uploads/2024/09/tmh_white-1-e1727334009858-150x55.png",
        href: "https://thelixholdings.com/wp-content/uploads/2024/09/tmh_white-1-e1727334009858-150x55.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={unbounded.className}>
        <Providers>
          <main>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
