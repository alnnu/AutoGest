import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { sidebarMenuType } from "@/utils/types/navMenus"
import { Wrench } from "lucide-react"
import { DynamicIcon } from "lucide-react/dynamic"

export default function MainSidebar() {
  const pages: sidebarMenuType = [
    {
      icon: "layout-dashboard",
      label: "dashboard",
      text: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: "users-round",
      label: "clients",
      text: "Clientes",
      href: "/clientes",
    },
    {
      icon: "car",
      label: "car",
      text: "Veículos",
      href: "/veiculos",
    },
    {
      icon: "wrench",
      label: "services",
      text: "Serviços",
      href: "servicos",
    },
  ]
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="mx-4 mt-6 flex">
          <div className="mr-4 flex size-12 items-center justify-center rounded-xl bg-blue-500">
            <Wrench className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AutoGest</h1>
            <p className="text-sm font-light">Gestão Automotiva</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="mx-4 mt-6">
        <SidebarGroup>
          <NavigationMenu orientation="vertical">
            <NavigationMenuList className="w-full flex-col items-start">
              {pages.map((item) => (
                <NavigationMenuItem key={item.label} className="mb-2 w-full">
                  <NavigationMenuLink asChild>
                    <Link href={item.href} className="w-full">
                      <DynamicIcon
                        name={item.icon}
                        className="mr-2 size-5 text-gray-600"
                      />
                      <span className="text-xl font-light">{item.text}</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
