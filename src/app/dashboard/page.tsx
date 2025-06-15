import { AppLayout } from "@/components/layout/AppLayout";
import { AccountBalanceCard } from "@/components/dashboard/AccountBalanceCard";
import { OpenPositionsTable } from "@/components/dashboard/OpenPositionsTable";
import { RecentTradesTable } from "@/components/dashboard/RecentTradesTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="grid gap-6 md:gap-8">
        <div className="grid gap-6 md:grid-cols-3">
          <AccountBalanceCard />
          <Card className="md:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Image 
                src="https://placehold.co/600x250.png" 
                alt="Market overview placeholder" 
                width={600} 
                height={250}
                className="rounded-md object-cover w-full"
                data-ai-hint="market graph"
              />
              <p className="text-sm text-muted-foreground mt-2">
                A quick glance at current market trends. More detailed charts available in the Charting section.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <OpenPositionsTable />
          <RecentTradesTable />
        </div>

         <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg flex flex-col items-center justify-center transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up h-8 w-8 mb-2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                    New Trade
                </button>
                <button className="p-4 bg-card hover:bg-muted rounded-lg flex flex-col items-center justify-center transition-all border">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet h-8 w-8 mb-2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                    Deposit
                </button>
                 <button className="p-4 bg-card hover:bg-muted rounded-lg flex flex-col items-center justify-center transition-all border">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-landmark h-8 w-8 mb-2"><path d="M22 10a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10Z"/><path d="M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"/><path d="M12 22V10"/></svg>
                    Withdraw
                </button>
                 <button className="p-4 bg-card hover:bg-muted rounded-lg flex flex-col items-center justify-center transition-all border">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-cog h-8 w-8 mb-2"><path d="M16 20a6 6 0 0 1-12 0Z"/><circle cx="10" cy="10" r="4"/><path d="m19.5 16-.9-2.4c-.2-.7-.9-1-1.6-.9l-2.4.9c-.7.2-1 .9-.9 1.6l.9 2.4"/><path d="m21.6 19.5.9 2.4c.2.7.9 1 1.6.9l2.4-.9c.7-.2 1-.9.9-1.6l-.9-2.4"/><path d="M18 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M22 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>
                    Settings
                </button>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
