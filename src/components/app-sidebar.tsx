import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, } from "@/components/ui/sidebar";
import { ArrowLeftRight, PiggyBank, Settings, ChartColumn } from "lucide-react";
import AppSidebarHeader from "./sidebar-header";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartColumn,
    },
    {
      title: "Budget",
      url: "/budget",
      icon: PiggyBank,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: ArrowLeftRight,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ]
  return (
    
    <Sidebar collapsible="icon" {...props} className="bg-emerald-500">
      <SidebarHeader className="bg-emerald-500 pt-4">
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent className="bg-emerald-500 text-white p-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="hover:bg-emerald-600 hover:text-white">
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}