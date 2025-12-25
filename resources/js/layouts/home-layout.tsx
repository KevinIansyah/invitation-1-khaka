import AppLayoutTemplate from '@/layouts/home/app-header-layout';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate {...props}>{children}</AppLayoutTemplate>
);
