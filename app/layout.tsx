import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/landing-page/theme-provider";

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Sebsibe Elias - Personal Blog",
  description: "Join me as I share my story, experiences, and mission to make a positive impact in the world.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        
          <ThemeProvider 
            attribute="class" 
            defaultTheme="light" 
            enableSystem 
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        
      </body>
    </html>
  );
}