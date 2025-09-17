import { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { MobileHeader } from "./MobileHeader";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <MobileHeader />
      <main className="pt-16 pb-20 md:pb-6">
        {children}
      </main>
      {/* Hide bottom navigation on tablet and desktop */}
      <div className="md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};