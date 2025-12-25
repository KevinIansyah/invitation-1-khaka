import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    success?: string;
    error?: string;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface GuestBook {
    id: number;
    name: string;
    slug: string;
    contact?: string | null;
    category: string | null;
    is_attending?: boolean | null;
    total_guests?: number;
    opened_at?: string | null;
    answered_at?: string | null;
    message?: string | null;
    note?: string | null;
    created_at: string;
    updated_at: string;
}

export interface GuestBookFormData {
    name: string;
    slug?: string;
    contact?: string;
    category?: string;
    is_attending?: boolean;
    total_guests?: number;
    message?: string;
    note?: string;
}

export interface Gift {
    id: number;
    bank_name: string;
    account_number: string;
    account_name: string;
    bank_logo?: string;
    created_at: string;
}

export interface GiftFormData {
    bank_name: string;
    account_number: string;
    account_name: string;
    bank_logo?: string;
}

export interface Invitation {
    id: number;
    child_name?: string | null;
    child_photo?: string | null;
    father_name?: string | null;
    mother_name?: string | null;
    event_date?: string | null;
    event_time?: string | null;
    event_location?: string | null;
    event_location_url?: string | null;
    music?: string | null;
    whatsapp_number?: string | null;
    whatsapp_message?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface Wish {
    id: number;
    name: string;
    message: string;
    created_at: string;
}

export interface Paginator<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    prev_page_url: string | null;
    next_page_url: string | null;
    path: string;
    first_page_url: string;
    last_page_url: string;
}
