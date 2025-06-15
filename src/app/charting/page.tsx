import { AppLayout } from "@/components/layout/AppLayout";
import { PriceChart } from "@/components/charting/PriceChart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

export default function ChartingPage() {
  return (
    <AppLayout>
      <div className="grid gap-6 md:gap-8">
        <PriceChart />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Technical Indicators</CardTitle>
              <CardDescription>Overlay common indicators like RSI, MACD.</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src="https://placehold.co/300x150.png" alt="Indicators" width={300} height={150} className="rounded-md w-full" data-ai-hint="technical indicators" />
              <p className="text-sm text-muted-foreground mt-2">Configure indicators from chart settings.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Drawing Tools</CardTitle>
              <CardDescription>Trend lines, Fibonacci retracements, etc.</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src="https://placehold.co/300x150.png" alt="Drawing Tools" width={300} height={150} className="rounded-md w-full" data-ai-hint="chart tools" />
               <p className="text-sm text-muted-foreground mt-2">Access tools from the chart toolbar.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Timeframes</CardTitle>
              <CardDescription>Switch between different chart timeframes.</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src="https://placehold.co/300x150.png" alt="Timeframes" width={300} height={150} className="rounded-md w-full" data-ai-hint="chart timeframes" />
              <p className="text-sm text-muted-foreground mt-2">Select from 1M, 5M, 1H, 1D, etc.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
