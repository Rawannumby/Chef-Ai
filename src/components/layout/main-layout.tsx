'use client';

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroup,
  useSidebar,
} from '@/components/ui/sidebar';
import { Header } from '@/components/layout/header';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { ThemeProvider } from 'next-themes';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar />
          <div className="flex-1">
            <Header />
            <main className="p-4 sm:p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

function AppSidebar() {
  const { isMobile } = useSidebar();
  return (
    <Sidebar
      collapsible={isMobile ? 'offcanvas' : 'icon'}
      className="border-r"
    >
      <SidebarHeader className="flex items-center justify-center p-4">
        <h1 className="text-2xl font-bold font-headline text-primary">C</h1>
        <h1 className="text-xl font-semibold font-headline group-data-[state=expanded]:block hidden">hefAI</h1>
        <SidebarTrigger className="absolute right-2 top-3 group-data-[state=expanded]:block hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3 w-full">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src="https://placehold.co/100x100.png"
              alt="Chef Sarah"
              data-ai-hint="user avatar"
            />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
          <div className="flex-1 group-data-[state=expanded]:block hidden">
            <p className="text-sm font-semibold">Chef Sarah</p>
            <p className="text-xs text-muted-foreground">
              sarah.chef@example.com
            </p>
          </div>
          <button className="p-2 rounded-md hover:bg-muted-foreground/10 group-data-[state=expanded]:block hidden">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
