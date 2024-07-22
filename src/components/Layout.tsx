"use client";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileNavBar from "./MobileNavBar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
        <MobileNavBar />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Layout;
