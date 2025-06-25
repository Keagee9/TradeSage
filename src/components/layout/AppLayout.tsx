
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
import { LayoutDashboard, LineChart, Star, BrainCircuit, Settings, ShieldCheck, FlaskConical } from 'lucide-react';
import { NavLink } from './NavLink';
import { LogoIcon } from '../icons/LogoIcon';
import Link from 'next/link';

export function AppLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <SidebarProvider defaultOpen>
      <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <LogoIcon className="h-8 w-8 text-primary group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7" />
            <h1 className="text-xl font-semibold text-foreground group-data-[collapsible=icon]:hidden">
              TradeSage
            </h1>
          </Link>
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
            <SidebarMenuItem>
              <NavLink href="/research" icon={FlaskConical} tooltip="AI Research">
                Research Assistant
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <NavLink href="/admin" icon={ShieldCheck} tooltip="Admin Panel">
                  Admin
                </NavLink>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter className="p-2">
           <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
            <Settings className="h-5 w-5 group-data-[collapsible=icon]:mr-0 mr-2" />
            <span className="group-data-[collapsible=icon]:hidden">Settings</span>
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
