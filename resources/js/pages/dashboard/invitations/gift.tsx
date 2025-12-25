import HeadingSmall from '@/components/heading-small';
import { TableGift } from '@/components/table-gift';
import AppLayout from '@/layouts/app-layout';
import InvitationsLayout from '@/layouts/invitations/layout';
import { edit } from '@/routes/profile';
import type { BreadcrumbItem, Gift as GiftType } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan Hadiah',
        href: edit().url,
    },
];

interface GiftPageProps {
    gifts: GiftType[];
}

export default function Gift({ gifts }: GiftPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Hadiah" />

            <InvitationsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Informasi Hadiah" description="Lengkapi informasi rekening untuk hadiah undangan" />

                    <TableGift data={gifts} />
                </div>
            </InvitationsLayout>
        </AppLayout>
    );
}
