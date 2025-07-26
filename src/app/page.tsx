import RecipeGenerator from '@/components/recipe-generator';

export default function Home() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, Chef! 👋</h1>
        <p className="text-muted-foreground">
          What delicious recipe would you like to create today? Select your ingredients and let AI work its magic.
        </p>
      </div>
      <RecipeGenerator />
    </div>
  );
}
