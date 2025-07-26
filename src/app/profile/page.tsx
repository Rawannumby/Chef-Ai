import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <User className="text-primary" />
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>User profile information will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
