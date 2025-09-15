import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { TrendingUp, Search, BarChart3, Target, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Scanner",
    url: createPageUrl("Scanner"),
    icon: Search,
  },
  {
    title: "Top Opportunities",
    url: createPageUrl("TopOpportunities"),
    icon: Target,
  },
  {
    title: "Analytics",
    url: createPageUrl("Analytics"),
    icon: BarChart3,
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --background: 0 0% 8%;
            --foreground: 0 0% 98%;
            --card: 0 0% 12%;
            --card-foreground: 0 0% 98%;
            --popover: 0 0% 12%;
            --popover-foreground: 0 0% 98%;
            --primary: 142 76% 36%;
            --primary-foreground: 0 0% 98%;
            --secondary: 0 0% 14%;
            --secondary-foreground: 0 0% 98%;
            --muted: 0 0% 14%;
            --muted-foreground: 0 0% 63%;
            --accent: 0 0% 14%;
            --accent-foreground: 0 0% 98%;
            --destructive: 0 84% 60%;
            --destructive-foreground: 0 0% 98%;
            --border: 0 0% 20%;
            --input: 0 0% 20%;
            --ring: 142 76% 36%;
          }
          
          body {
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
          }
        `}
      </style>
      <div className="min-h-screen flex w-full bg-gray-900">
        <Sidebar className="border-r border-gray-800">
          <SidebarHeader className="border-b border-gray-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg">SpreadScanner</h2>
                <p className="text-xs text-gray-400">Options Intelligence</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-green-500/10 hover:text-green-400 transition-all duration-200 rounded-lg mb-1 ${
                          location.pathname === item.url ? 'bg-green-500/20 text-green-400 border-l-2 border-green-400' : 'text-gray-300'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2 py-2">
                Market Summary
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 py-2 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">S&P 500</span>
                    <span className="text-green-400 font-medium">+1.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">VIX</span>
                    <span className="text-yellow-400 font-medium">18.5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Active Scans</span>
                    <span className="text-blue-400 font-medium">0</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">T</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm truncate">Trader</p>
                <p className="text-xs text-gray-400 truncate">Options Strategist</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-semibold text-white">SpreadScanner</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto bg-gray-900">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
