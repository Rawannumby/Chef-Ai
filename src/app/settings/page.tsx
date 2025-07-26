
'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Settings, Shield, Palette, Bell, KeyRound, MonitorSmartphone, LogOut, Sun, Moon, Type, Languages, RefreshCw, Mail, Smartphone, Newspaper, Utensils, Star, Rows4, Columns4, Database, Trash2, Download, Eye, FileText, Cookie, LifeBuoy, BookOpen, Video, Send } from "lucide-react";
import { useTheme } from 'next-themes';
import Link from 'next/link';

const settingsItems = [
  {
    value: "security",
    icon: Shield,
    title: "Account Security",
    description: "Password, authentication, and security settings",
  },
  {
    value: "display",
    icon: Palette,
    title: "Display Preferences",
    description: "Customize appearance, theme, and language settings",
  },
  {
    value: "notifications",
    icon: Bell,
    title: "Notification Settings",
    description: "Manage email, push notifications, and cooking reminders",
  },
  {
    value: "data-management",
    icon: Database,
    title: "Data Management",
    description: "Export data, clear cache, and manage account deletion",
  },
  {
    value: "need-help",
    icon: LifeBuoy,
    title: "Need Help?",
    description: "Contact support, read user guides, or watch video tutorials",
  },
];

export default function SettingsPage() {
  const [openItems, setOpenItems] = useState<string[]>(['security', 'display', 'notifications', 'data-management', 'need-help']);
  const { theme, setTheme } = useTheme();

  const handleExpandAll = () => {
    setOpenItems(settingsItems.map(item => item.value));
  };

  const handleCollapseAll = () => {
    setOpenItems([]);
  };

  return (
    <div className="space-y-6">
       <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExpandAll}>
                <Rows4 className="mr-2 h-4 w-4" />
                Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={handleCollapseAll}>
                <Columns4 className="mr-2 h-4 w-4" />
                Collapse All
            </Button>
        </div>
      </header>

      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full space-y-4">
        <AccordionItem value="security" className="border rounded-lg bg-card overflow-hidden">
          <AccordionTrigger className="p-6 hover:no-underline">
            <div className="flex items-center gap-4">
                <Shield className="h-6 w-6 text-muted-foreground" />
                <div>
                    <h3 className="text-lg font-semibold text-left">Account Security</h3>
                    <p className="text-sm text-muted-foreground text-left">Password, authentication, and security settings</p>
                </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-6">
                <SettingsRow title="Change Password" description="Update your account password for better security">
                    <Button variant="outline" size="sm"><KeyRound className="mr-2"/>Change</Button>
                </SettingsRow>
                 <SettingsRow title="Two-Factor Authentication" description="Add an extra layer of security to your account">
                    <Switch />
                </SettingsRow>
                 <SettingsRow title="Active Sessions" description="Manage your active login sessions">
                    <Button variant="outline" size="sm"><MonitorSmartphone className="mr-2"/>View Sessions</Button>
                </SettingsRow>
                 <SettingsRow title="Sign Out" description="Sign out from your account on this device" isLast>
                    <Button variant="destructive" size="sm"><LogOut className="mr-2"/>Sign Out</Button>
                </SettingsRow>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="display" className="border rounded-lg bg-card overflow-hidden">
           <AccordionTrigger className="p-6 hover:no-underline">
                <div className="flex items-center gap-4">
                    <Palette className="h-6 w-6 text-muted-foreground" />
                    <div>
                        <h3 className="text-lg font-semibold text-left">Display Preferences</h3>
                        <p className="text-sm text-muted-foreground text-left">Customize appearance, theme, and language settings</p>
                    </div>
                </div>
           </AccordionTrigger>
           <AccordionContent className="px-6 pb-6">
               <div className="space-y-6">
                    <SettingsRow title="Dark Mode" description="Switch between light and dark themes">
                         <div className="flex items-center gap-2">
                            <Sun className="h-5 w-5" />
                            <Switch checked={theme === 'dark'} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
                            <Moon className="h-5 w-5" />
                        </div>
                    </SettingsRow>
                    <SettingsRow title="Font Size" description="">
                        <Select defaultValue="default">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="default">Default</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                        </Select>
                    </SettingsRow>
                    <SettingsRow title="Language" description="">
                         <Select defaultValue="english">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="spanish">Español</SelectItem>
                                <SelectItem value="french">Français</SelectItem>
                            </SelectContent>
                        </Select>
                    </SettingsRow>
                     <SettingsRow title="Color Theme" description="" isLast>
                         <div className="flex flex-col items-end gap-4">
                            <Select defaultValue="warm">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="warm">Warm</SelectItem>
                                    <SelectItem value="cool">Cool</SelectItem>
                                    <SelectItem value="vibrant">Vibrant</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-muted-foreground mr-2">Preview:</p>
                                <div className="h-4 w-4 rounded-full bg-green-500"></div>
                                <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                                <div className="h-4 w-4 rounded-full bg-teal-500"></div>
                                <p className="text-sm text-muted-foreground ml-2">Current theme colors</p>
                           </div>
                         </div>
                    </SettingsRow>
                    <div className="flex justify-end pt-4">
                        <Button variant="ghost"><RefreshCw className="mr-2"/>Reset to Defaults</Button>
                    </div>
               </div>
           </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notifications" className="border rounded-lg bg-card overflow-hidden">
           <AccordionTrigger className="p-6 hover:no-underline">
                <div className="flex items-center gap-4">
                    <Bell className="h-6 w-6 text-muted-foreground" />
                    <div>
                        <h3 className="text-lg font-semibold text-left">Notification Settings</h3>
                        <p className="text-sm text-muted-foreground text-left">Manage email, push notifications, and cooking reminders</p>
                    </div>
                </div>
           </AccordionTrigger>
           <AccordionContent className="px-6 pb-6">
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-base mb-2">General Notifications</h4>
                        <div className="space-y-4">
                            <CheckboxRow id="email-notifications" label="Email Notifications" description="Receive notifications via email" defaultChecked />
                            <CheckboxRow id="push-notifications" label="Push Notifications" description="Browser and mobile push notifications" defaultChecked />
                            <CheckboxRow id="weekly-digest" label="Weekly Digest" description="Summary of your cooking activity and new recipes" defaultChecked />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-base mb-2">Recipe Notifications</h4>
                        <div className="space-y-4">
                           <CheckboxRow id="cooking-reminders" label="Cooking Reminders" description="Reminders for meal planning and cooking times" />
                           <CheckboxRow id="favorite-updates" label="Favorite Recipe Updates" description="Get notified when your favorite recipes are updated" defaultChecked />
                           <CheckboxRow id="promotional-content" label="Promotional Content" description="Special offers, new features, and cooking tips" />
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-base mb-2 mt-4">Notification Frequency</h4>
                        <div className="space-y-4">
                            <SettingsRow title="Notification Frequency" description="">
                                <Select defaultValue="daily">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select frequency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="never">Never</SelectItem>
                                    </SelectContent>
                                </Select>
                            </SettingsRow>
                            <SettingsRow title="Quiet Hours" description="Mute notifications during these hours">
                                <Switch />
                            </SettingsRow>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between pt-6">
                    <Button variant="outline"><Send className="mr-2" /> Send Test Notification</Button>
                    <Button>Save Notification Settings</Button>
                </div>
           </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="data-management" className="border rounded-lg bg-card overflow-hidden">
           <AccordionTrigger className="p-6 hover:no-underline">
                <div className="flex items-center gap-4">
                    <Database className="h-6 w-6 text-muted-foreground" />
                    <div>
                        <h3 className="text-lg font-semibold text-left">Data Management</h3>
                        <p className="text-sm text-muted-foreground text-left">Export data, clear cache, and manage account deletion</p>
                    </div>
                </div>
           </AccordionTrigger>
           <AccordionContent className="px-6 pb-6 space-y-6">
                <div>
                    <h4 className="font-semibold text-base mb-2">Your Data Overview</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between"><span>Recipes Created:</span><span className="font-medium text-foreground">47</span></div>
                        <div className="flex justify-between"><span>Favorite Recipes:</span><span className="font-medium text-foreground">12</span></div>
                        <div className="flex justify-between"><span>Cooking Sessions:</span><span className="font-medium text-foreground">156</span></div>
                        <div className="flex justify-between"><span>Saved Ingredients:</span><span className="font-medium text-foreground">89</span></div>
                        <div className="flex justify-between"><span>Reviews Written:</span><span className="font-medium text-foreground">23</span></div>
                        <div className="flex justify-between"><span>Total Data Size:</span><span className="font-medium text-foreground">2.4 MB</span></div>
                    </div>
                </div>
                <SettingsRow title="Export Personal Data" description="Download all your recipes, preferences, and cooking history">
                    <Button variant="outline" size="sm"><Download className="mr-2"/>Export</Button>
                </SettingsRow>
                <SettingsRow title="Clear Application Cache" description="Free up storage space and resolve performance issues">
                    <Button variant="outline" size="sm"><Trash2 className="mr-2"/>Clear Cache</Button>
                </SettingsRow>
                 <div>
                    <h4 className="font-semibold text-base mb-2">Privacy Controls</h4>
                    <div className="space-y-2">
                        <Link href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><Eye className="h-4 w-4" /> View Privacy Policy</Link>
                        <Link href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><FileText className="h-4 w-4" /> Terms of Service</Link>
                        <Link href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><Cookie className="h-4 w-4" /> Cookie Preferences</Link>
                    </div>
                </div>
                <SettingsRow title="Delete Account" description="Permanently delete your account and all associated data" isLast>
                    <Button variant="destructive" size="sm"><Trash2 className="mr-2"/>Delete</Button>
                </SettingsRow>
           </AccordionContent>
        </AccordionItem>

        <AccordionItem value="need-help" className="border rounded-lg bg-card overflow-hidden">
           <AccordionTrigger className="p-6 hover:no-underline">
                <div className="flex items-center gap-4">
                    <LifeBuoy className="h-6 w-6 text-muted-foreground" />
                    <div>
                        <h3 className="text-lg font-semibold text-left">Need Help?</h3>
                        <p className="text-sm text-muted-foreground text-left">Can't find what you're looking for? Our support team is here to help.</p>
                    </div>
                </div>
           </AccordionTrigger>
           <AccordionContent className="px-6 pb-6">
              <div className="flex items-center gap-4">
                <Button variant="outline"><Mail className="mr-2" /> Contact Support</Button>
                <Button variant="outline"><BookOpen className="mr-2" /> User Guide</Button>
                <Button variant="outline"><Video className="mr-2" /> Video Tutorials</Button>
              </div>
           </AccordionContent>
        </AccordionItem>
      </Accordion>

      <footer className="text-center text-xs text-muted-foreground space-y-2 pt-8">
        <div className="flex justify-center items-center gap-4">
            <span>ChefAI v2.1.0</span>
            <span>•</span>
            <span>Last updated: 27/7/2025</span>
        </div>
        <div className="flex justify-center items-center gap-4">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
        </div>
        <p>© 2025 ChefAI. All rights reserved.</p>
      </footer>
    </div>
  );
}


interface SettingsRowProps {
    title: string;
    description: string;
    children: React.ReactNode;
    isLast?: boolean;
}

const SettingsRow = ({ title, description, children, isLast = false }: SettingsRowProps) => (
  <div className={`flex justify-between items-center ${!isLast && 'border-b pb-6'}`}>
    <div>
      <p className="font-medium">{title}</p>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
    {children}
  </div>
);

interface CheckboxRowProps {
  id: string;
  label: string;
  description: string;
  defaultChecked?: boolean;
}

const CheckboxRow = ({ id, label, description, defaultChecked }: CheckboxRowProps) => (
  <div className="flex items-start gap-3">
    <Checkbox id={id} className="mt-1" defaultChecked={defaultChecked} />
    <div className="grid gap-0.5">
      <Label htmlFor={id} className="font-medium">{label}</Label>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);
    
