import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    const isActive = (itemHref: string | { url: string }) => {
        const href = typeof itemHref === 'string' ? itemHref : itemHref.url;
        const currentPath = page.url.split('?')[0];
        const itemPath = href.split('?')[0];

        if (itemPath === '/dashboard') {
            return currentPath === '/dashboard';
        }

        if (href === '/dashboard/invitations') {
            return currentPath.startsWith('/dashboard/invitations');
        }

        if (href === '/dashboard/wish') {
            return currentPath.startsWith('/dashboard/wish');
        }

        if (href === '/dashboard/guest-book') {
            return currentPath.startsWith('/dashboard/guest-book');
        }

        return currentPath.startsWith(itemPath);
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={{ children: item.title }}>
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
