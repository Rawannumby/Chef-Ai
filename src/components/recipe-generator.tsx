'use client';

import {
  generateRecipeFromIngredients,
  type GenerateRecipeFromIngredientsOutput,
} from '@/ai/flows/generate-recipe-from-ingredients';
import {
    identifyIngredientsFromImage,
} from '@/ai/flows/identify-ingredients-from-image';
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
import { ChefHat, Loader2, Salad, Sparkles, Upload, Search, Camera, Leaf, WheatOff, Vegan, Beef, Heart, Clock, BrainCircuit } from 'lucide-react';
import React, { useState, useTransition, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';

const ingredientsData = {
  PROTEIN: [
    { name: 'Chicken Breast', tags: [] },
    { name: 'Salmon Fillet', tags: [] },
    { name: 'Tofu', tags: ['vegetarian', 'vegan'] },
    { name: 'Eggs', tags: ['vegetarian'] },
  ],
  GRAINS: [
    { name: 'Quinoa', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Brown Rice', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Pasta', tags: ['vegetarian', 'vegan'] },
    { name: 'Bread', tags: ['vegetarian', 'vegan'] },
  ],
  VEGETABLES: [
    { name: 'Onions', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Garlic', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Tomatoes', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Bell Peppers', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Carrots', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Broccoli', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Spinach', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Mushrooms', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Avocado', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Potato', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Sweet Potato', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Zucchini', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Cucumber', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Lettuce', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Kale', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Celery', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Eggplant', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Corn', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Green Beans', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Peas', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Asparagus', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Cauliflower', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Cabbage', tags: ['vegetarian', 'vegan', 'gluten-free'] },
    { name: 'Bitter Gourd', tags: ['vegetarian', 'vegan', 'gluten-free'] },
  ],
  DAIRY: [
    { name: 'Milk', tags: ['vegetarian'] },
    { name: 'Cheese', tags: ['vegetarian'] },
    { name: 'Butter', tags: ['vegetarian'] },
  ],
  'OTHER': [
      { name: 'Olive Oil', tags: ['vegetarian', 'vegan', 'gluten-free'] },
      { name: 'Salt', tags: ['vegetarian', 'vegan', 'gluten-free'] },
      { name: 'Pepper', tags: ['vegetarian', 'vegan', 'gluten-free'] },
  ]
};

const allIngredients = Object.values(ingredientsData).flat().map(i => i.name);


const preferenceIcons = {
  vegetarian: Leaf,
  vegan: Vegan,
  glutenFree: WheatOff,
  highProtein: Beef,
};

export default function RecipeGenerator() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    highProtein: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [recipe, setRecipe] = useState<GenerateRecipeFromIngredientsOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isRecognizing, startRecognitionTransition] = useTransition();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  
  const filteredIngredients = Object.entries(ingredientsData)
    .map(([category, ingredients]) => {
      const filtered = ingredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return [category, filtered] as const;
    })
    .filter(([, ingredients]) => ingredients.length > 0);

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoDataUri = e.target?.result as string;
        if (photoDataUri) {
          startRecognitionTransition(async () => {
            try {
              const { ingredients } = await identifyIngredientsFromImage({ photoDataUri });
              const matchedIngredients = ingredients.filter(identified => 
                allIngredients.some(available => available.toLowerCase() === identified.toLowerCase())
              );
              
              setSelectedIngredients(prev => [...new Set([...prev, ...matchedIngredients])]);

              toast({
                title: 'Ingredients Identified',
                description: `Added ${matchedIngredients.length} ingredients from your image.`,
              });

            } catch (error) {
              console.error('Failed to identify ingredients:', error);
              toast({
                title: 'Error',
                description: 'Failed to identify ingredients from the image. Please try again.',
                variant: 'destructive',
              });
            }
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      const timer = setTimeout(() => {
        handleSubmit();
      }, 1500); // Debounce API call
      return () => clearTimeout(timer);
    }
  }, [selectedIngredients, preferences]);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="font-headline text-xl">
                Select Ingredients
              </CardTitle>
              <p className="text-sm text-muted-foreground">{selectedIngredients.length} selected</p>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search ingredients..." 
                className="pl-9 bg-muted border-0 focus-visible:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button variant="ghost" className="w-full justify-center gap-2" onClick={() => fileInputRef.current?.click()} disabled={isRecognizing}>
              {isRecognizing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              {isRecognizing ? 'Analyzing...' : 'Capture Ingredients'}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            <div>
              <Label className="text-base font-semibold">Dietary Preferences</Label>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                {Object.entries(preferences).map(([key, value]) => {
                  const Icon = preferenceIcons[key as keyof typeof preferenceIcons];
                  return (
                    <div key={key} className="flex items-center space-x-2">
                       <Checkbox
                        id={key}
                        checked={value}
                        onCheckedChange={() => handlePreferenceChange(key as keyof typeof preferences)}
                      />
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor={key} className="font-normal capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                    </div>
                  )
                })}
              </div>
            </div>
            
            <ScrollArea className="h-64">
              <div className="space-y-4 pr-4">
              {filteredIngredients.map(([category, ingredients]) => (
                  <div key={category}>
                    <p className="font-semibold text-muted-foreground text-sm mb-2 uppercase tracking-wider">{category}</p>
                    <div className="space-y-1">
                      {ingredients.map((ingredient) => (
                        <div key={ingredient.name} className="flex items-center p-2 rounded-md hover:bg-muted">
                          <Checkbox
                            id={ingredient.name}
                            onCheckedChange={() => handleIngredientChange(ingredient.name)}
                            checked={selectedIngredients.includes(ingredient.name)}
                            className="mr-3"
                          />
                          <Label htmlFor={ingredient.name} className="font-normal flex-1 cursor-pointer">{ingredient.name}</Label>
                          <div className="flex gap-2">
                             {ingredient.tags.includes('vegetarian') && <Leaf className="h-4 w-4 text-green-500" title="Vegetarian"/>}
                             {ingredient.tags.includes('vegan') && <Vegan className="h-4 w-4 text-green-700" title="Vegan"/>}
                             {ingredient.tags.includes('gluten-free') && <WheatOff className="h-4 w-4 text-orange-500" title="Gluten-Free"/>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        {isPending && (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] rounded-lg border-2 border-dashed">
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
               {recipe.nutrition && (
                <div>
                  <h3 className="text-xl font-headline font-bold mb-2">Nutritional Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {Object.entries(recipe.nutrition).map(([key, value]) => (
                      <div key={key} className="bg-muted p-3 rounded-lg">
                        <p className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-lg">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
          <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] rounded-lg border bg-card text-card-foreground">
             <CardHeader className="text-center">
                <div className="flex justify-center">
                  <div className="p-3 bg-muted rounded-full">
                     <ChefHat className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <CardTitle className="font-headline text-2xl mt-4">Ready to Cook with AI?</CardTitle>
                <CardDescription className="max-w-xs mx-auto">
                    Select ingredients from the left panel to generate personalized recipes using Google Gemini AI.
                </CardDescription>
             </CardHeader>
             <CardContent>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <BrainCircuit className="h-4 w-4" />
                        <span>AI-powered</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Real-time generation</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        <span>Personalized</span>
                    </div>
                </div>
             </CardContent>
          </div>
        )}
      </div>
    </div>
  );
}
