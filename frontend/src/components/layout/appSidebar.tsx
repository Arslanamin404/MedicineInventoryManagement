import { Home, Package, PlusCircle, Search, Trash2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Add Product",
    url: "/products/add",
    icon: PlusCircle,
  },
  {
    title: "Search",
    url: "/products/search",
    icon: Search,
  },
  {
    title: "Delete Medicine",
    url: "/products",
    icon: Trash2,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-[#0B3D2E] text-gray-50">
        <SidebarGroup>
          <SidebarGroupLabel className="md:text-3xl font-bold text-white my-2 ">
            Quick Links
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="py-6 mb-1 px-2" asChild>
                    <a href={item.url} className="text-xl">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
