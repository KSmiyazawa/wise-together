"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import UserDropdownMenu from "./user-dropdown-menu";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export interface User {
  name: string,
  email: string,
  avatar: string,
}

export default function Header() {
  const pathname = usePathname();
  const cleanPathname = pathname.slice(1);
  const pageName = cleanPathname.charAt(0).toUpperCase() + cleanPathname.slice(1);

  const supabase = getSupabaseBrowserClient();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Failed to get session:", error);
        return;
      }
      
      if (data.session) {
        const userData = data.session.user.user_metadata;

        setUser({
          email: userData.email || "",
          name: userData.full_name || "",
          avatar: userData.avatar_url || ""
        });
      }
    };

    fetchSession();
  }, [supabase]);

  return (
    <header className="p-2 bg-white flex h-14 shrink-0 items-center gap-2">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageName}</h1>
        <div className="ml-auto flex items-center gap-2">
          <p>{`Hi, ${user.name.split(" ")[0]}!`}</p>
          <UserDropdownMenu user={user}/>
        </div>
      </div>
      
    </header>
  )
}
