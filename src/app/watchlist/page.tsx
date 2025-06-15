import { AppLayout } from "@/components/layout/AppLayout";
import { WatchlistManager } from "@/components/watchlist/WatchlistManager";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

export default function WatchlistPage() {
  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <WatchlistManager />
        </div>
        <div className="lg:col-span-1">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Market News Snippets</CardTitle>
              <CardDescription>Latest headlines affecting your watchlist.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1,2,3].map((i) => (
                <div key={i} className="border-b pb-2 last:border-b-0 last:pb-0">
                  <h4 className="font-semibold text-sm mb-1">Placeholder News Title {i}</h4>
                  <p className="text-xs text-muted-foreground">Brief summary of the news article related to watched assets. This can affect price movements...</p>
                  <a href="#" className="text-xs text-accent hover:underline mt-1 inline-block">Read more</a>
                </div>
              ))}
               <Image src="https://placehold.co/300x150.png" alt="News graph" width={300} height={150} className="rounded-md w-full mt-4" data-ai-hint="news finance" />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
