
'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Shield, Palette, Bell, HardDrive, LifeBuoy, Info, Film, Rows4, Columns4 } from "lucide-react";
import Link from 'next/link';

const settingsItems = [
  {
    value: "item-1",
    icon: Shield,
    title: "Account Security",
    description: "Password, authentication, and security settings",
    content: "Here you can change your password, set up two-factor authentication, and review your recent login activity."
  },
  {
    value: "item-2",
    icon: Palette,
    title: "Display Preferences",
    description: "Customize appearance, theme, and language settings",
    content: "Choose your preferred theme (light/dark), adjust font sizes, and select your language."
  },
  {
    value: "item-3",
    icon: Bell,
    title: "Notification Settings",
    description: "Manage email, push notifications, and cooking reminders",
    content: "Control which notifications you receive, including new recipe alerts, updates, and reminders."
  },
  {
    value: "item-4",
    icon: HardDrive,
    title: "Data Management",
    description: "Export data, clear cache, and manage account deletion",
    content: "You can export your personal data, clear the application cache to free up space, or permanently delete your account."
  }
];

export default function SettingsPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleExpandAll = () => {
    setOpenItems(settingsItems.map(item => item.value));
  };

  const handleCollapseAll = () => {
    setOpenItems([]);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-muted rounded-lg">
          <Settings className="h-8 w-8 text-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-headline">Application Settings</h1>
          <p className="text-muted-foreground">Customize your ChefAI experience and manage your account</p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleExpandAll}>
          <Rows4 className="mr-2 h-4 w-4" />
          Expand All
        </Button>
        <Button variant="outline" size="sm" onClick={handleCollapseAll}>
          <Columns4 className="mr-2 h-4 w-4" />
          Collapse All
        </Button>
      </div>

      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full space-y-4">
        {settingsItems.map((item) => {
           const Icon = item.icon;
           return (
            <AccordionItem key={item.value} value={item.value} className="bg-card border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <Icon className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold text-left">{item.title}</h3>
                    <p className="text-sm text-muted-foreground text-left">{item.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-14">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
      
      <Card className="bg-card">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
             <LifeBuoy className="h-8 w-8 text-muted-foreground" />
            <div>
              <h3 className="text-xl font-bold font-headline">Need Help?</h3>
              <p className="text-muted-foreground">Can't find what you're looking for? Our support team is here to help.</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button variant="outline" asChild>
              <Link href="#">
                <Info className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
             <Button variant="outline" asChild>
              <Link href="#">
                <Info className="mr-2 h-4 w-4" />
                User Guide
              </Link>
            </Button>
             <Button variant="outline" asChild>
              <Link href="#">
                <Film className="mr-2 h-4 w-4" />
                Video Tutorials
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <footer className="text-center text-xs text-muted-foreground pt-8">
        <div className="flex justify-between items-center">
            <p>ChefAI v2.1.0  •  Last updated: 26/7/2025</p>
            <div className="flex gap-4">
                <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary">Terms of Service</Link>
            </div>
        </div>
        <p className="mt-4">© 2025 ChefAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
