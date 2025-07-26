import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Settings className="text-primary" />
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Application and user settings will be managed here.</p>
      </CardContent>
    </Card>
  );
}
