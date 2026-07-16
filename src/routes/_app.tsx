import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppSidebar, MobileNav } from "@/components/app-sidebar";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="aurora-bg min-h-screen">
      <AppSidebar />
      <MobileNav />
      <main className="md:pl-[17.5rem] md:pr-3 pt-3 pb-24 md:pb-6 px-3">
        <div className="mx-auto max-w-7xl animate-fade-up">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
