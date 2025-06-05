"use client"

import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import UserDropdownMenu from "./user-dropdown-menu";

export default function Header() {
  const pathname = usePathname();
  const cleanPathname = pathname.slice(1);
  const pageName = cleanPathname.charAt(0).toUpperCase() + cleanPathname.slice(1);

  const user = {
    avatar: "",
    name: "User",
    email: "user@email.com"
  }

  return (
    <header className="p-2 bg-white flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageName}</h1>
        <div className="ml-auto flex items-center gap-2">
          <p>Hi, User!</p>
          <UserDropdownMenu user={user}/>
        </div>
      </div>
      
    </header>
  )
}
