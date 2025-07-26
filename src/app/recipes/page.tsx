import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function RecipesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <BookOpen className="text-primary" />
          Full Recipe View
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is where all recipes will be displayed.</p>
      </CardContent>
    </Card>
  );
}
