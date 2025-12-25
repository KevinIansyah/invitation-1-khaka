import Heading from '@/components/heading';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Hero1 from '../../../../public/images/hero-2.svg';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { totalguests, totalwishes } = usePage<{
        totalguests: number;
        totalwishes: number;
    }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="mt-2 flex h-full flex-1 flex-col overflow-x-auto rounded-xl p-4">
                <Heading title="Dashboard Dateng Aja" description="Kelola data dan informasi tamu undangan" />

                <div className="flex w-full justify-center overflow-hidden rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
                    <img src={Hero1} alt="Dashboard Hero" className="h-[400px] w-full object-cover object-top lg:w-[80%]" />
                </div>

                <div className="mt-4 grid auto-rows-min gap-4 md:grid-cols-2">
                    {/* Jumlah Tamu */}
                    <Card className="shadow-none">
                        <CardHeader>
                            <CardDescription>Jumlah Tamu</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{totalguests}</CardTitle>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="font-medium">Total tamu terdaftar</div>
                            <div className="text-muted-foreground">Berdasarkan daftar undangan</div>
                        </CardFooter>
                    </Card>

                    {/* Jumlah Ucapan */}
                    <Card className="shadow-none">
                        <CardHeader>
                            <CardDescription>Jumlah Ucapan</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{totalwishes}</CardTitle>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="font-medium">Ucapan dari para tamu</div>
                            <div className="text-muted-foreground">Buku tamu & doa</div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
