import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-blue-50">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <Header />
          {children}
        </main>
      </SidebarProvider>
    </div>
  )
}
