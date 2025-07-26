import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function RecentRecipesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Clock className="text-primary" />
          Recent Recipes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your recently viewed or generated recipes will be listed here.</p>
      </CardContent>
    </Card>
  );
}
