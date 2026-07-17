import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { AppSidebar, MobileNav } from "@/components/app-sidebar";
import { InteractiveBackground } from "@/components/motion/background";
import { CustomCursor } from "@/components/motion/cursor";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { PageTransition } from "@/components/motion";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="relative min-h-screen">
      <SmoothScroll />
      <CustomCursor />
      <InteractiveBackground />
      <AppSidebar />
      <MobileNav />
      <main className="md:pl-[17.5rem] md:pr-3 pt-3 pb-24 md:pb-6 px-3">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            <PageTransition key={pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
