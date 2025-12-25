import { DataTableGuestBook } from '@/components/datatable-guest-book';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import guestBook from '@/routes/guest-book';
import type { BreadcrumbItem, GuestBook as GuestBookType, Invitation, Paginator } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Buku Tamu',
        href: guestBook.index().url,
    },
];

export default function GuestBook() {
    const { guestbooks, invitation, filters } = usePage<{
        guestbooks: Paginator<GuestBookType>;
        invitation?: Invitation;
        filters: { search?: string };
    }>().props;

    const { data, current_page, last_page, per_page, total } = guestbooks;
    const [pageIndex, setPageIndex] = useState(current_page - 1);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buku Tamu" />
            <div className="mt-2 p-4">
                <Heading title="Buku Tamu" description="Kelola daftar dan informasi tamu" />

                <DataTableGuestBook
                    data={data}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    totalPages={last_page}
                    totalItems={total}
                    perPage={per_page}
                    invitation={invitation}
                    initialFilters={filters}
                />
            </div>
        </AppLayout>
    );
}
