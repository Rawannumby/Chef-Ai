'use client';
import {
  Home,
  BookOpen,
  User,
  Settings,
  Clock,
  Heart,
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
    groupLabel: 'Navigation',
    items: [
      { href: '/', label: 'Dashboard', icon: Home },
      { href: '/recipes', label: 'Full Recipe View', icon: BookOpen },
      { href: '/profile', label: 'Profile', icon: User },
      { href: '/settings', label: 'Settings', icon: Settings },
    ],
  },
  {
    groupLabel: 'Recipe Collections',
    items: [
      { href: '/recent-recipes', label: 'Recent Recipes', icon: Clock },
      { href: '/favorite-recipes', label: 'Favorite Recipes', icon: Heart },
    ],
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4">
      {menuItems.map((group, index) => (
        <SidebarGroup key={index}>
          <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item, itemIndex) => (
              <SidebarMenuItem key={itemIndex}>
                <Link href={item.href} passHref legacyBehavior>
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
