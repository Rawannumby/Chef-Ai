
'use client';
import {
  Home,
  User,
  Settings,
  Clock,
  Heart,
  ChevronRight,
  LayoutDashboard,
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

const menuItems = [
   {
    groupLabel: 'Navigation',
    items: [
      { href: '/generator', label: 'Dashboard', icon: Home },
      { href: '/profile', label: 'Profile', icon: User },
      { href: '/settings', label: 'Settings', icon: Settings },
    ],
  },
  {
    groupLabel: 'Recipe Collections',
    items: [
      { href: '/recent-recipes', label: 'Recent Recipes', icon: Clock, suffix: <ChevronRight className="h-4 w-4" /> },
      { href: '/favorite-recipes', label: 'Favorite Recipes', icon: Heart, suffix: <ChevronRight className="h-4 w-4" /> },
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
                    className="justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.suffix}
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
