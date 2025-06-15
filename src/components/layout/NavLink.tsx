
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import type { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  tooltip: string;
}

export function NavLink({ href, icon: Icon, children, tooltip }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link href={href}>
      <SidebarMenuButton
        asChild={false}
        isActive={isActive}
        tooltip={{ children: tooltip, className: "capitalize" }}
        className="justify-start"
      >
        <Icon className="h-5 w-5" />
        <span className="truncate">{children}</span>
      </SidebarMenuButton>
    </Link>
  );
}
