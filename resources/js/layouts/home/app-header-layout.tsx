import { AppShell } from '@/components/app-shell';
import { HomeContent } from '@/components/home-content';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({
    children,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell>
            <HomeContent>{children}</HomeContent>
        </AppShell>
    );
}
