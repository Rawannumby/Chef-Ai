
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
import { ChefHat, Loader2, Salad, Sparkles, Upload, Search, Camera, Leaf, WheatOff, Vegan, Beef, Heart, Clock, BrainCircuit, Filter } from 'lucide-react';
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
        { name: 'Broccoli', tags: ['vegetarian', 'vegan', 'gluten-free']},
        { name: 'Spinach', tags: ['vegetarian', 'vegan', 'gluten-free']},
        { name: 'Bell Peppers', tags: ['vegetarian', 'vegan', 'gluten-free']},
        { name: 'Carrots', tags: ['vegetarian', 'vegan', 'gluten-free']},
        { name: 'Zucchini', tags: ['vegetarian', 'vegan', 'gluten-free']},
        { name: 'Mushrooms', tags: ['vegetarian', 'vegan', 'gluten-free']},
        { name: 'Bitter Gourd', tags: ['vegetarian', 'vegan', 'gluten-free']},
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
      // Placeholder for image recognition logic
      toast({
        title: 'Image Uploaded',
        description: 'Image recognition is not yet implemented.',
      });
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="p-4 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">
                Select Ingredients
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{selectedIngredients.length} selected</span>
                <Filter className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search ingredients..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button variant="ghost" className="w-full justify-center gap-2 text-muted-foreground" onClick={() => fileInputRef.current?.click()} disabled={isRecognizing}>
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
            
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="space-y-4 pr-4">
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
                          <Label htmlFor={key} className="font-normal capitalize flex items-center gap-2">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </div>

              {filteredIngredients.map(([category, ingredients]) => (
                  <div key={category}>
                    <p className="font-semibold text-muted-foreground text-sm my-2 uppercase tracking-wider">{category}</p>
                    <div className="space-y-2">
                      {ingredients.map((ingredient) => (
                        <div key={ingredient.name} className="flex items-center p-3 rounded-md border bg-card hover:bg-muted">
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

      <div className="lg:col-span-1">
        {isPending && (
          <Card className="h-full flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg font-semibold text-muted-foreground">
              Generating your masterpiece...
            </p>
          </Card>
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
          <Card className="h-full flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
             <CardHeader>
                <div className="flex justify-center mb-4">
                   <div className="p-4 bg-muted rounded-full">
                       <ChefHat className="h-10 w-10 text-muted-foreground" />
                    </div>
                </div>
                <CardTitle className="text-2xl mt-4">Ready to Cook with AI?</CardTitle>
                <CardDescription className="max-w-xs mx-auto">
                    Select ingredients from the left panel to generate personalized recipes using Google Gemini AI.
                </CardDescription>
             </CardHeader>
             <CardContent>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
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
          </Card>
        )}
      </div>
    </div>
  );
}
