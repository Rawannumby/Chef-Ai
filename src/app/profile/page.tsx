
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart2, BookOpen, Camera, ChefHat, Clock, Cog, Flame, Heart, Lock, Palette, Shield, Upload, User, UserCog, KeyRound, Laptop, Smartphone, Tablet, Info, CheckCircle, HelpCircle, X, TrendingUp, Star, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Profile Management</h1>
          <p className="text-muted-foreground">Customize your account and cooking preferences</p>
        </div>
        <p className="text-sm text-muted-foreground">Member since March 2024</p>
      </header>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <UserCog className="mr-2" /> Preferences
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2" /> Security
          </TabsTrigger>
          <TabsTrigger value="activity">
            <BarChart2 className="mr-2" /> Activity
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Lock className="mr-2" /> Privacy
          </TabsTrigger>
        </TabsList>
        <Separator className="my-6" />
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Photo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed bg-muted">
                    <User className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Drop photo here</p>
                  <div className="flex justify-center gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2" />
                      Choose File
                    </Button>
                    <Button variant="outline" size="sm">
                      <Camera className="mr-2" />
                      Take Photo
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, GIF (max 5MB)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Cooking Statistics</CardTitle>
                  <BarChart2 className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Your culinary journey at a glance</p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <StatCard icon={ChefHat} value="127" label="Recipes Generated" tooltip="AI-generated recipes" />
                    <StatCard icon={Heart} value="23" label="Favorites Saved" tooltip="Bookmarked recipes" />
                    <StatCard icon={Flame} value="12" label="Cooking Streak" unit="days" tooltip="Consecutive cooking days" />
                    <StatCard icon={Clock} value="48h" label="Time Cooking" />
                    <StatCard icon={BookOpen} value="8" label="Cookbooks" />
                    <StatCard icon={Palette} value="15" label="Custom Themes" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <p className="text-sm text-muted-foreground">Update your personal details and contact information</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="chef_master_2024" disabled />
                    <p className="text-xs text-muted-foreground">This will be displayed on your recipes and profile</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="chef@example.com" disabled />
                     <p className="text-xs text-muted-foreground">Used for account notifications and password recovery</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Alex" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Johnson" />
                    </div>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    <p className="text-xs text-muted-foreground">Optional - for account security notifications</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" defaultValue="Passionate home cook exploring flavors from around the world" className="min-h-[100px]" />
                  </div>
                   <div className="flex justify-end">
                      <Button>Save Changes</Button>
                   </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="preferences">
           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Cooking Preferences</CardTitle>
                <CardDescription>Customize your recipe recommendations</CardDescription>
              </div>
              <Cog className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-8">
              <PreferenceSelect 
                label="Cooking Skill Level"
                description="This helps us suggest appropriate recipes"
                defaultValue="intermediate"
                options={[
                  { value: "beginner", label: "Beginner" },
                  { value: "intermediate", label: "Intermediate" },
                  { value: "advanced", label: "Advanced" },
                ]}
              />
              <PreferenceSelect 
                label="Preferred Cooking Time"
                description="How much time do you usually have for cooking?"
                defaultValue="medium"
                options={[
                  { value: "short", label: "Under 30 min" },
                  { value: "medium", label: "30-60 min" },
                  { value: "long", label: "Over 60 min" },
                ]}
              />
              <PreferenceSelect 
                label="Spice Tolerance"
                description="How spicy do you like your food?"
                defaultValue="medium"
                options={[
                  { value: "none", label: "None" },
                  { value: "mild", label: "Mild" },
                  { value: "medium", label: "Medium" },
                  { value: "hot", label: "Hot" },
                ]}
              />
              <PreferenceSelect 
                label="Typical Serving Size"
                description="How many people do you usually cook for?"
                defaultValue="2-4"
                options={[
                  { value: "1", label: "1 Person" },
                  { value: "2-4", label: "2-4 People" },
                  { value: "5+", label: "5+ People" },
                ]}
              />
               <PreferenceSelect 
                label="Favorite Cuisines"
                description="Select your preferred cuisine types"
                placeholder="Select an option"
                options={[
                  { value: "italian", label: "Italian" },
                  { value: "mexican", label: "Mexican" },
                  { value: "chinese", label: "Chinese" },
                  { value: "indian", label: "Indian" },
                  { value: "american", label: "American" },
                ]}
              />
              <div>
                <Label className="text-base font-semibold">Dietary Restrictions</Label>
                <p className="text-sm text-muted-foreground mb-4">Select any dietary preferences or restrictions</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="space-y-4">
                    <CheckboxItem id="vegetarian" label="Vegetarian" description="No meat or fish" />
                    <CheckboxItem id="gluten-free" label="Gluten-Free" description="No gluten-containing ingredients" />
                    <CheckboxItem id="ketogenic" label="Ketogenic" description="Low-carb, high-fat diet" />
                    <CheckboxItem id="low-sodium" label="Low Sodium" description="Reduced salt intake" />
                  </div>
                  <div className="space-y-4">
                    <CheckboxItem id="vegan" label="Vegan" description="No animal products" />
                    <CheckboxItem id="dairy-free" label="Dairy-Free" description="No dairy products" />
                    <CheckboxItem id="paleo" label="Paleo" description="Whole foods, no processed items" />
                    <CheckboxItem id="high-protein" label="High Protein" description="Focus on high protein content" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Manage your account security and login settings</CardDescription>
              </div>
              <Shield className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SecurityInfoCard
                  icon={Clock}
                  title="Last Login"
                  value="Jan 22, 2025, 02:30 PM"
                  description="San Francisco, CA"
                />
                <SecurityInfoCard
                  icon={HelpCircle}
                  title="Connected Devices"
                  value="3 active devices"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Password & Authentication</h3>
                </div>
                <RadioGroup defaultValue="none" className="flex items-center gap-8">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline">Change Password</Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2fa" id="2fa" />
                    <Label htmlFor="2fa">Enable 2FA</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Laptop className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Connected Devices</h3>
                </div>
                <div className="space-y-2">
                  <DeviceItem 
                    icon={Laptop} 
                    name="MacBook Pro" 
                    location="San Francisco, CA" 
                    lastActive="Jan 22, 2025, 04:45 PM" 
                    isCurrent 
                  />
                  <DeviceItem 
                    icon={Smartphone} 
                    name="iPhone 15" 
                    location="San Francisco, CA" 
                    lastActive="Jan 22, 2025, 03:20 PM" 
                  />
                  <DeviceItem 
                    icon={Tablet} 
                    name="iPad Air" 
                    location="San Francisco, CA" 
                    lastActive="Jan 21, 2025, 07:30 PM" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Security Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Use a strong, unique password for your account.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Enable two-factor authentication for extra security.
                  </li>
                   <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Regularly review and remove unused connected devices.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your cooking journey and recipe interactions</CardDescription>
                </div>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[450px]">
                <div className="space-y-4">
                  <ActivityItem 
                    icon={ChefHat}
                    title="Generated Creamy Mushroom Risotto"
                    description="Used ingredients: mushrooms, arborio rice, parmesan, white wine"
                    category="Recipe Generated"
                    date="Jan 22"
                  />
                  <ActivityItem 
                    icon={Heart}
                    title="Added Spicy Thai Basil Chicken to favorites"
                    description="Saved for quick access in your recipe collection"
                    category="Recipe Favorited"
                    date="Jan 22"
                  />
                  <ActivityItem 
                    icon={Flame}
                    title="Cooked Mediterranean Quinoa Bowl"
                    description="Rated 5 stars and left a review"
                    category="Recipe Cooked"
                    date="Jan 21"
                  />
                   <ActivityItem 
                    icon={Cog}
                    title="Updated cooking preferences"
                    description="Changed skill level to intermediate and added dietary restrictions"
                    category="Profile Updated"
                    date="Jan 21"
                  />
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
               <Button variant="link" asChild className="w-full">
                  <Link href="#">
                    View All Activity <ArrowRight className="ml-2" />
                  </Link>
                </Button>
            </CardFooter>
          </Card>
        </TabsContent>
         <TabsContent value="privacy">
          <p>Privacy settings will go here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface StatCardProps {
    icon: React.ElementType;
    value: string;
    label: string;
    unit?: string;
    tooltip?: string;
}

const StatCard = ({ icon: Icon, value, label, unit, tooltip }: StatCardProps) => (
   <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="space-y-1 bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center justify-center gap-2">
              <Icon className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">{value}</p>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </TooltipTrigger>
        {tooltip && <TooltipContent><p>{tooltip}</p></TooltipContent>}
      </Tooltip>
   </TooltipProvider>
)

interface PreferenceSelectProps {
  label: string;
  description: string;
  defaultValue?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

const PreferenceSelect = ({ label, description, defaultValue, placeholder, options }: PreferenceSelectProps) => (
  <div className="grid gap-2">
    <Label>{label}</Label>
    <Select defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder || "Select an option"} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

interface CheckboxItemProps {
  id: string;
  label: string;
  description: string;
}

const CheckboxItem = ({ id, label, description }: CheckboxItemProps) => (
  <div className="flex items-start gap-3">
    <Checkbox id={id} className="mt-1" />
    <div className="grid gap-0.5">
      <Label htmlFor={id} className="font-medium">{label}</Label>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);
    
interface SecurityInfoCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  description?: string;
}

const SecurityInfoCard = ({ icon: Icon, title, value, description }: SecurityInfoCardProps) => (
  <div className="p-4 bg-muted/50 rounded-lg flex items-start gap-4">
    <Icon className="h-6 w-6 text-muted-foreground mt-1" />
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="font-semibold">{value}</p>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  </div>
)

interface DeviceItemProps {
  icon: React.ElementType;
  name: string;
  location: string;
  lastActive: string;
  isCurrent?: boolean;
}

const DeviceItem = ({ icon: Icon, name, location, lastActive, isCurrent }: DeviceItemProps) => (
  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
    <div className="flex items-center gap-4">
      <Icon className="h-6 w-6 text-muted-foreground" />
      <div>
        <p className="font-semibold">{name} {isCurrent && <span className="text-xs text-green-500 font-medium ml-2">Current</span>}</p>
        <p className="text-xs text-muted-foreground">{location} • Last active {lastActive}</p>
      </div>
    </div>
    {!isCurrent && (
      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
        <X className="mr-2" />
        Remove
      </Button>
    )}
  </div>
)

interface ActivityItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  category: string;
  date: string;
}

const ActivityItem = ({ icon: Icon, title, description, category, date }: ActivityItemProps) => (
  <div className="flex items-start justify-between py-3 border-b last:border-b-0">
    <div className="flex items-start gap-4">
      <div className="p-2 bg-muted rounded-full">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {category} &bull; {date}
        </p>
      </div>
    </div>
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Button>
  </div>
);
    

    

    