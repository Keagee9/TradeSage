"use client";

import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, LineChart, Star, BrainCircuit, Settings, LogOut, CandlestickChart } from 'lucide-react';
import { NavLink } from './NavLink';
import { LogoIcon } from '../icons/LogoIcon';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Basic skeleton or null until client is mounted to avoid hydration mismatch with sidebar state from cookies
    return (
      <div className="flex min-h-screen w-full bg-background">
        <div className="w-16 md:w-64 bg-sidebar-background border-r border-sidebar-border p-4">
          {/* Skeleton sidebar */}
        </div>
        <div className="flex-1 p-4 md:p-8">{children}</div>
      </div>
    );
  }
  
  return (
    <SidebarProvider defaultOpen>
      <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <LogoIcon className="h-8 w-8 text-primary group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7" />
            <h1 className="text-xl font-semibold text-foreground group-data-[collapsible=icon]:hidden">
              TradeSage
            </h1>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <NavLink href="/dashboard" icon={LayoutDashboard} tooltip="Dashboard">
                Dashboard
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink href="/charting" icon={LineChart} tooltip="Charting">
                Charting
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink href="/watchlist" icon={Star} tooltip="Watchlist">
                Watchlist
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <NavLink href="/ai-analysis" icon={BrainCircuit} tooltip="AI Analysis">
                AI Analysis
              </NavLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter className="p-2">
           <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:py-2">
            <Avatar className="h-9 w-9 group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar" />
              <AvatarFallback>TS</AvatarFallback>
            </Avatar>
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium text-sidebar-foreground">User Name</p>
              <p className="text-xs text-muted-foreground">user@tradesage.com</p>
            </div>
          </div>
           <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
             <Settings className="h-5 w-5 group-data-[collapsible=icon]:mr-0 mr-2" />
             <span className="group-data-[collapsible=icon]:hidden">Settings</span>
           </Button>
           <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 text-red-500 hover:text-red-400 hover:bg-red-500/10">
             <LogOut className="h-5 w-5 group-data-[collapsible=icon]:mr-0 mr-2" />
             <span className="group-data-[collapsible=icon]:hidden">Log Out</span>
           </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-sm px-6">
          <SidebarTrigger className="md:hidden" />
          <h2 className="text-lg font-semibold">TradeSage</h2>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
