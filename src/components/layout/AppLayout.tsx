
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
import { LayoutDashboard, LineChart, Star, BrainCircuit, Settings, LogOut, ShieldCheck, Loader2, LogIn } from 'lucide-react';
import { NavLink } from './NavLink';
import { LogoIcon } from '../icons/LogoIcon';
import Link from 'next/link';
import { signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [authLoading, setAuthLoading] = React.useState(true);
  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    setMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/auth/login');
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: error.message || "Could not log out. Please try again.",
      });
    }
  };


  if (!mounted || authLoading) {
    return (
      <div className="flex min-h-screen w-full bg-background items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  
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
              <NavLink href="/admin" icon={ShieldCheck} tooltip="Admin Panel">
                Admin
              </NavLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter className="p-2">
           {currentUser ? (
             <>
              <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:py-2">
                <Avatar className="h-9 w-9 group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7">
                  <AvatarImage src={currentUser.photoURL || "https://placehold.co/100x100.png"} alt="User Avatar" data-ai-hint="user avatar" />
                  <AvatarFallback>{currentUser.email?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
                <div className="group-data-[collapsible=icon]:hidden">
                  <p className="text-sm font-medium text-sidebar-foreground truncate" title={currentUser.displayName || currentUser.email || "User"}>{currentUser.displayName || currentUser.email || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate" title={currentUser.email || ""}>{currentUser.email}</p>
                </div>
              </div>
              <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
                <Settings className="h-5 w-5 group-data-[collapsible=icon]:mr-0 mr-2" />
                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
              </Button>
              <Button onClick={handleLogout} variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 text-red-500 hover:text-red-400 hover:bg-red-500/10">
                <LogOut className="h-5 w-5 group-data-[collapsible=icon]:mr-0 mr-2" />
                <span className="group-data-[collapsible=icon]:hidden">Log Out</span>
              </Button>
             </>
           ) : (
             <Link href="/auth/login" className="w-full">
               <Button variant="outline" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
                 <LogIn className="h-5 w-5 group-data-[collapsible=icon]:mr-0 mr-2" />
                 <span className="group-data-[collapsible=icon]:hidden">Login / Sign Up</span>
               </Button>
             </Link>
           )}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-sm px-6">
          <SidebarTrigger className="md:hidden" />
          <h2 className="text-lg font-semibold">TradeSage</h2>
          {/* Header login button can be removed or kept based on design preference, as sidebar has login/user info now */}
          {!currentUser && !authLoading && (
             <Link href="/auth/login">
                <Button variant="outline" size="sm">Login</Button>
             </Link>
          )}
          {currentUser && !authLoading && (
             <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.photoURL || "https://placehold.co/100x100.png"} alt="User Avatar" data-ai-hint="user avatar" />
                <AvatarFallback>{currentUser.email?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
          )}
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
