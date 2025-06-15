
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Users, Activity, Settings2, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from '@/components/ui/button';

// Hardcoded admin email - replace with proper role management (e.g., Firebase Custom Claims)
const ADMIN_EMAIL = "admin@tradesage.com";

export default function AdminPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        // Placeholder admin check:
        if (user.email === ADMIN_EMAIL) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          // Optionally, redirect non-admins immediately:
          // router.push('/dashboard'); 
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
        router.push('/auth/login?redirect=/admin'); // Redirect to login if not authenticated, pass redirect query
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.14)-theme(spacing.16))]"> {/* Adjust height based on header/footer of AppLayout */}
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg mt-4">Loading Admin Panel...</p>
        </div>
      </AppLayout>
    );
  }

  if (!currentUser) {
    // This state should ideally be brief due to redirection in useEffect.
    // It can act as a fallback UI.
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.14)-theme(spacing.16))] text-center p-4">
          <ShieldCheck className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Redirecting to Login</h1>
          <p className="text-muted-foreground mb-6">You must be logged in to view the admin panel.</p>
          <Button onClick={() => router.push('/auth/login?redirect=/admin')}>Go to Login</Button>
        </div>
      </AppLayout>
    );
  }
  
  if (!isAdmin) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.14)-theme(spacing.16))] text-center p-4">
          <ShieldCheck className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Unauthorized Access</h1>
          <p className="text-muted-foreground mb-6">You do not have permission to view the admin panel.</p>
          <p className="text-xs text-muted-foreground mb-4">Logged in as: {currentUser.email}</p>
          <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
        </div>
      </AppLayout>
    );
  }

  // If authenticated and admin, show the admin content
  return (
    <AppLayout>
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-3xl">Admin Dashboard</CardTitle>
                <CardDescription>Manage users, settings, and monitor application activity. (User: {currentUser.email})</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Welcome to the TradeSage admin panel. From here you can oversee various aspects of the application.</p>
            <p className="text-xs text-muted-foreground mt-2">Note: Admin access is currently determined by matching the email '{ADMIN_EMAIL}'. For a production app, use Firebase Custom Claims for proper role management.</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Management</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+52 since last week</p>
              <Image src="https://placehold.co/300x150.png" alt="User chart" width={300} height={150} className="rounded-md w-full mt-4" data-ai-hint="user growth graph" />
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Optimal</div>
              <p className="text-xs text-muted-foreground">All systems functioning normally.</p>
               <Image src="https://placehold.co/300x150.png" alt="System health" width={300} height={150} className="rounded-md w-full mt-4" data-ai-hint="server status dashboard" />
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">App Settings</CardTitle>
              <Settings2 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 Active</div>
              <p className="text-xs text-muted-foreground">Feature flags & configurations.</p>
               <Image src="https://placehold.co/300x150.png" alt="App settings" width={300} height={150} className="rounded-md w-full mt-4" data-ai-hint="settings cogwheels" />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
