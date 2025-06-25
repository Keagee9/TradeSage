import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Users, Activity, Settings2 } from "lucide-react";
import Image from "next/image";

export default function AdminPage() {

  // Since authentication is removed, this page is now public.
  // The content is displayed directly without any user or role checks.

  return (
    <AppLayout>
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-3xl">Admin Dashboard</CardTitle>
                <CardDescription>Manage users, settings, and monitor application activity.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Welcome to the TradeSage admin panel. From here you can oversee various aspects of the application.</p>
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
