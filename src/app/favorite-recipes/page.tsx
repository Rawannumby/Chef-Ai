import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function FavoriteRecipesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Heart className="text-primary" />
          Favorite Recipes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your favorite recipes will be saved and displayed here.</p>
      </CardContent>
    </Card>
  );
}
