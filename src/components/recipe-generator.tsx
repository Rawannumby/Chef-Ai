'use client';

import {
  generateRecipeFromIngredients,
  type GenerateRecipeFromIngredientsOutput,
} from '@/ai/flows/generate-recipe-from-ingredients';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ChefHat, Loader2, Salad, Sparkles } from 'lucide-react';
import React, { useState, useTransition } from 'react';

const availableIngredients = [
  'Chicken', 'Beef', 'Pork', 'Fish', 'Tofu', 'Eggs', 'Milk', 'Cheese',
  'Rice', 'Pasta', 'Potatoes', 'Bread', 'Quinoa', 'Lentils', 'Beans',
  'Onions', 'Garlic', 'Tomatoes', 'Bell Peppers', 'Carrots', 'Broccoli',
  'Spinach', 'Mushrooms', 'Avocado', 'Olive Oil', 'Butter', 'Salt', 'Pepper'
];

export default function RecipeGenerator() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    highProtein: false,
  });
  const [recipe, setRecipe] = useState<GenerateRecipeFromIngredientsOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleIngredientChange = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handlePreferenceChange = (preference: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [preference]: !prev[preference] }));
  };

  const handleSubmit = () => {
    if (selectedIngredients.length === 0) {
      toast({
        title: 'No Ingredients Selected',
        description: 'Please select at least one ingredient to generate a recipe.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await generateRecipeFromIngredients({
          ingredients: selectedIngredients,
          ...preferences,
        });
        setRecipe(result);
      } catch (error) {
        console.error('Failed to generate recipe:', error);
        toast({
          title: 'Error',
          description: 'Failed to generate recipe. Please try again.',
          variant: 'destructive',
        });
        setRecipe(null);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <Card className="lg:col-span-1 sticky top-24">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <ChefHat className="text-primary" />
            Recipe Creator
          </CardTitle>
          <CardDescription>
            Select ingredients and preferences to craft your perfect dish.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-lg font-semibold">Ingredients</Label>
            <ScrollArea className="h-64 mt-2 rounded-md border p-4">
              <div className="grid grid-cols-2 gap-4">
                {availableIngredients.map((ingredient) => (
                  <div key={ingredient} className="flex items-center space-x-2">
                    <Checkbox
                      id={ingredient}
                      onCheckedChange={() => handleIngredientChange(ingredient)}
                      checked={selectedIngredients.includes(ingredient)}
                    />
                    <Label htmlFor={ingredient} className="font-normal">{ingredient}</Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div>
            <Label className="text-lg font-semibold">Dietary Preferences</Label>
            <div className="space-y-3 mt-2">
              {Object.keys(preferences).map((key) => (
                <div key={key} className="flex items-center justify-between rounded-lg border p-3">
                  <Label htmlFor={key} className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                  <Switch
                    id={key}
                    checked={preferences[key as keyof typeof preferences]}
                    onCheckedChange={() => handlePreferenceChange(key as keyof typeof preferences)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-lg font-semibold">Your Pantry</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedIngredients.length > 0 ? (
                selectedIngredients.map((ingredient) => (
                  <Badge key={ingredient} variant="secondary">{ingredient}</Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Select some ingredients to see them here.</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isPending} className="w-full">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Recipe
          </Button>
        </CardFooter>
      </Card>

      <div className="lg:col-span-2">
        {isPending && (
          <div className="flex flex-col items-center justify-center h-96 rounded-lg border-2 border-dashed">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg font-semibold text-muted-foreground">
              Generating your masterpiece...
            </p>
          </div>
        )}
        {!isPending && recipe && (
          <Card className="animate-in fade-in-50">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-primary">{recipe.recipeName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-headline font-bold mb-2">Required Ingredients</h3>
                <ul className="list-disc list-inside space-y-1">
                  {recipe.requiredIngredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="text-xl font-headline font-bold mb-2">Instructions</h3>
                <ol className="list-decimal list-inside space-y-3">
                  {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
              {recipe.alternativeSuggestions && recipe.alternativeSuggestions.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-headline font-bold mb-2 flex items-center gap-2">
                      <Salad className="h-5 w-5" />
                      Alternative Suggestions
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {recipe.alternativeSuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
        {!isPending && !recipe && (
          <div className="flex flex-col items-center justify-center h-96 rounded-lg border-2 border-dashed bg-muted/50">
            <ChefHat className="h-16 w-16 text-muted-foreground/50" />
            <p className="mt-4 text-xl font-semibold text-muted-foreground">
              Your recipe will appear here
            </p>
            <p className="text-muted-foreground text-center mt-1">
              Select your ingredients and let our AI chef work its magic!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
