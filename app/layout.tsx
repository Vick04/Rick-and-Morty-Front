import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import "@/styles/globals.css";
import { QueryProvider } from "@/components/QueryProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Rick and Morty Front",
    template: "%s - Rick and Morty Front",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="text-secondary-900 dark:text-secondary-100 bg-white transition-colors duration-200 dark:bg-gray-800">
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider attribute="class">
              <Header />
              <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex min-h-screen flex-col">{children}</div>
              </main>
              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
