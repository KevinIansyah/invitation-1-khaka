import EventController from '@/actions/App/Http/Controllers/Invitation/EventController';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import InvitationsLayout from '@/layouts/invitations/layout';
import { edit } from '@/routes/profile';
import type { BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan Acara',
        href: edit().url,
    },
];

interface Invitation {
    id?: number;
    event_date?: string;
    event_time?: string;
    event_location?: string;
    event_location_url?: string;
}

interface EventPageProps {
    invitation?: Invitation;
}

export default function Event({ invitation }: EventPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Acara" />

            <InvitationsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Informasi Acara" description="Lengkapi informasi acara untuk ditampilkan pada undangan" />

                    <Form {...EventController.update.form()} options={{ preserveScroll: true }} className="space-y-6">
                        {({ processing, errors }) => (
                            <>
                                {/* Tanggal Acara */}
                                <div className="grid gap-2">
                                    <Label htmlFor="event_date">Tanggal Acara</Label>
                                    <Input id="event_date" name="event_date" type="date" defaultValue={invitation?.event_date || ''} required />
                                    <InputError message={errors.event_date} />
                                </div>

                                {/* Jam Acara */}
                                <div className="grid gap-2">
                                    <Label htmlFor="event_time">Waktu Acara</Label>
                                    <Input id="event_time" name="event_time" type="time" defaultValue={invitation?.event_time || ''} required />
                                    <InputError message={errors.event_time} />
                                </div>

                                {/* Lokasi Acara */}
                                <div className="grid gap-2">
                                    <Label htmlFor="event_location">Lokasi Acara</Label>
                                    <Input
                                        id="event_location"
                                        name="event_location"
                                        type="text"
                                        placeholder="Nama gedung / alamat acara"
                                        defaultValue={invitation?.event_location || ''}
                                        required
                                    />
                                    <InputError message={errors.event_location} />
                                </div>

                                {/* URL Lokasi */}
                                <div className="grid gap-2">
                                    <Label htmlFor="event_location_url">URL Lokasi (Google Maps)</Label>
                                    <Input
                                        id="event_location_url"
                                        name="event_location_url"
                                        type="url"
                                        placeholder="https://maps.google.com/..."
                                        defaultValue={invitation?.event_location_url || ''}
                                        required
                                    />
                                    <p className="text-sm text-muted-foreground">Tambahkan link Google Maps untuk memudahkan tamu menemukan lokasi.</p>
                                    <InputError message={errors.event_location_url} />
                                </div>

                                {/* Submit */}
                                <div className="flex items-center gap-4">
                                    <Button disabled={processing} data-test="update-event-button">
                                        Simpan
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </InvitationsLayout>
        </AppLayout>
    );
}
