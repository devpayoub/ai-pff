"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
  } from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SideBarOption } from "@/services/Constants"
import { usePathname } from "next/navigation"
import Link from "next/link"

  export function AppSidebar() {
    const path=usePathname()
    return (
      <Sidebar>
        <SidebarHeader className="flex items-center mt-5">
            <Image src="/logo.webp" alt="Logo"
            width={120} 
            height={120}
            className="w-[150px]" />
            <Button className="w-full mt-5"><Plus/>Create New Interview</Button>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
                {SideBarOption.map((option, index) => (
                    <SidebarMenuItem key={index} className='p-1'>
                        <SidebarMenuButton asChild className={`p-5 ${path == option.path && 'bg-blue-50'}`}>
                            <Link href={option.path}>
                                <option.icon className={`${path==option.path && 'text-primary'}`}/> 
                                <span className={`text-[16px] font-medium ${path==option.path && 'text-primary'}`}>{option.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup />      
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
