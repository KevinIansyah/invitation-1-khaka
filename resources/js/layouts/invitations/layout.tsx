import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { edit as editEvent } from '@/routes/event';
import { edit as editFamily } from '@/routes/family';
import { index as editGift } from '@/routes/gift';
import { edit as editMusic } from '@/routes/music';
import { edit as editShare } from '@/routes/share';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Keluarga',
        href: editFamily(),
        icon: null,
    },
    {
        title: 'Detail Acara',
        href: editEvent(),
        icon: null,
    },
    {
        title: 'Hadiah',
        href: editGift(),
        icon: null,
    },
    {
        title: 'Musik',
        href: editMusic(),
        icon: null,
    },
    {
        title: 'Bagikan Undangan',
        href: editShare(),
        icon: null,
    },
];

export default function InvitationsLayout({ children }: PropsWithChildren) {
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6">
            <Heading title="Pengaturan Undangan" description="Kelola konten dan tampilan undangan Anda" />

            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${typeof item.href === 'string' ? item.href : item.href.url}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath === (typeof item.href === 'string' ? item.href : item.href.url),
                                })}
                            >
                                <Link href={item.href}>
                                    {item.icon && <item.icon className="h-4 w-4" />}
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
