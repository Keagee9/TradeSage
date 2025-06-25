
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogoIcon } from '@/components/icons/LogoIcon';
import { BrainCircuit, LineChart, Star, ArrowRight, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link href="/landing" className="mr-6 flex items-center space-x-2">
            <LogoIcon className="h-6 w-6 text-primary" />
            <span className="font-bold">TradeSage</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <Link href="#features" className="text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </Link>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-2">
             <Button asChild>
              <Link href="/dashboard">Go to App</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/20">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Trade Smarter with <span className="text-primary">TradeSage</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
                Your AI-Powered Co-Pilot for Crypto and Forex Markets. Leverage advanced analysis, real-time charting, and intuitive tools to elevate your trading strategy.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg" asChild className="shadow-lg hover:shadow-primary/30 transition-shadow">
                  <Link href="/dashboard">
                    Launch App <TrendingUp className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="mt-12 md:mt-16 relative">
                <Image
                    src="https://placehold.co/960x540.png"
                    alt="TradeSage Dashboard Mockup"
                    width={960}
                    height={540}
                    className="rounded-xl shadow-2xl mx-auto ring-1 ring-border/50"
                    data-ai-hint="trading dashboard"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose TradeSage?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Powerful tools designed to give you a trading advantage.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
                    <BrainCircuit className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">AI-Powered Insights</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Unlock actionable trade recommendations with our sophisticated AI, analyzing market news and sentiment to give you an edge.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-accent/10 rounded-full mb-4 inline-block">
                    <LineChart className="h-10 w-10 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Real-Time Charting</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Visualize market movements with dynamic, interactive charts. Customize indicators and drawing tools to refine your analysis.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-yellow-400/10 rounded-full mb-4 inline-block">
                     <Star className="h-10 w-10 text-yellow-400" />
                  </div>
                  <CardTitle className="text-2xl">Personalized Watchlist</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Track your favorite crypto and forex pairs effortlessly. Get instant updates and manage your potential trades with ease.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Elevate Your Trading?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Join TradeSage today and gain access to powerful AI tools and insights to make more informed trading decisions.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild className="shadow-lg hover:shadow-primary/30 transition-shadow">
                <Link href="/dashboard">
                  Launch the App Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border/40 bg-background">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <LogoIcon className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} TradeSage. All rights reserved.</p>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
