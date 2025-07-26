'use client';
import {
  Home,
  BookOpen,
  User,
  Settings,
  Clock,
  Heart,
  ChefHat,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const menuItems = [
   {
    groupLabel: 'Main',
    items: [
      { href: '/', label: 'Home', icon: Home },
      { href: '/generator', label: 'Recipe Generator', icon: ChefHat },
    ],
  },
  {
    groupLabel: 'Library',
    items: [
      { href: '/recipes', label: 'All Recipes', icon: BookOpen },
      { href: '/recent-recipes', label: 'Recent', icon: Clock },
      { href: '/favorite-recipes', label: 'Favorites', icon: Heart },
    ],
  },
   {
    groupLabel: 'Account',
    items: [
      { href: '/profile', label: 'Profile', icon: User },
      { href: '/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      {menuItems.map((group, index) => (
        <SidebarGroup key={index}>
          <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item, itemIndex) => (
              <SidebarMenuItem key={itemIndex}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="truncate">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </div>
  );
}
