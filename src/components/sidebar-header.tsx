"use client"

import { SidebarMenu, SidebarMenuItem, useSidebar } from "./ui/sidebar";
import Image from "next/image";

export default function AppSidebarHeader() {

  const { state } = useSidebar();
  
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2">
        <Image
          src="/wise-together.png"
          width={30}
          height={30}
          alt="WiseTogether logo"
          priority
        />

        {state !== 'collapsed' && (
          <p className="text-white text-2xl flex-1">
            <span className="font-bold">Wise</span>
            Together
          </p>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
