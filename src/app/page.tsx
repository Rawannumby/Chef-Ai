import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, BrainCircuit, Camera } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-primary/20 text-primary p-4 rounded-full inline-block mb-6">
            <ChefHat className="h-12 w-12" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground">
            Discover Your Inner Chef with AI
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Stuck with random ingredients? Let ChefAI craft delicious, easy-to-follow recipes for you in seconds. Reduce food waste and explore new culinary horizons.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/generator">Start Cooking Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Why You'll Love ChefAI</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              From snapping a photo of your fridge to getting a complete recipe, we make cooking simple and fun.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                   <Camera className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">Snap & Cook</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use your camera to instantly identify ingredients. No more manual entry. Just snap a photo and we'll do the rest.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                   <BrainCircuit className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">Smart Recipe Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our AI, powered by Google Gemini, creates unique recipes tailored to your dietary needs and available ingredients.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                   <ChefHat className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">Become a Better Chef</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore new flavor combinations and learn cooking techniques with our easy-to-follow instructions and tips.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visual Feature Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">From Your Kitchen to a Culinary Masterpiece</h2>
                <p className="mt-4 text-muted-foreground">ChefAI transforms the way you see your ingredients. Simply show us what you have, and we'll provide the inspiration and guidance to create something amazing. Perfect for busy weeknights or culinary experiments.</p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Reduce Food Waste</h4>
                      <p className="text-muted-foreground">Use up what you have before it goes bad.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-1" />
                     <div>
                      <h4 className="font-semibold">Discover New Meals</h4>
                      <p className="text-muted-foreground">Break out of your cooking rut with exciting new recipes.</p>
                    </div>
                  </li>
                </ul>
            </div>
             <div className="relative aspect-square">
                <Image src="https://placehold.co/600x600.png" alt="ChefAI in action" className="rounded-lg shadow-lg" layout="fill" objectFit="cover" data-ai-hint="food ingredients" />
            </div>
        </div>
      </section>

       {/* Call to Action Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Start Your Culinary Adventure?</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Join thousands of home cooks who are making delicious meals and saving money with ChefAI.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/generator">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const CheckCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
