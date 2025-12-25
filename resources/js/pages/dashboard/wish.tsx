import { DataTableWish } from '@/components/datatable-wish';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import wish from '@/routes/wish';
import type { BreadcrumbItem, Paginator, Wish as WishType } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ucapan',
        href: wish.index().url,
    },
];

export default function Wish() {
    const { wish, filters } = usePage<{
        wish: Paginator<WishType>;
        filters: { search?: string };
    }>().props;

    const { data, current_page, last_page, per_page, total } = wish;
    const [pageIndex, setPageIndex] = useState(current_page - 1);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ucapan" />
            <div className="mt-2 p-4">
                <Heading title="Ucapan" description="Kelola daftar dan informasi ucapan" />

                <DataTableWish
                    data={data}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    totalPages={last_page}
                    totalItems={total}
                    perPage={per_page}
                    initialFilters={filters}
                />
            </div>
        </AppLayout>
    );
}
