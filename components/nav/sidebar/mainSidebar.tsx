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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { sidebarMenuType } from "@/utils/types/navMenus"
import { Wrench, Settings } from "lucide-react"
import { DynamicIcon } from "lucide-react/dynamic"
import { AdminUserData } from "@/utils/data/usersData"
import { UserType } from "@/utils/types/usersType"

export default function MainSidebar() {
  const pages: sidebarMenuType = [
    {
      icon: "layout-dashboard",
      label: "dashboard",
      text: "Dashboard",
      href: "/",
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
      href: "/servicos",
    },
  ]

  const account: UserType = AdminUserData
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="mx-4 mt-6 flex items-center">
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
      <SidebarFooter className="border-t-2">
        <div className="my-3 ml-4 flex items-center">
          <Avatar className="mr-4 size-9">
            <AvatarImage src={account.photo} />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="mr-4">
            <h3 className="text-sm font-bold">
              {account.name}
              <p className="text-sm font-light">{account.email}</p>
            </h3>
          </div>
          <div>
            <Settings className="size-4 text-gray-600" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
