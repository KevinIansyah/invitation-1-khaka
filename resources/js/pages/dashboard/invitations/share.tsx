import ShareController from '@/actions/App/Http/Controllers/Invitation/ShareController';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import InvitationsLayout from '@/layouts/invitations/layout';
import { edit } from '@/routes/profile';
import type { BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { AlertCircle, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan Share',
        href: edit().url,
    },
];

interface Invitation {
    id?: number;
    whatsapp_number?: string;
    whatsapp_message?: string;
}

interface SharePageProps {
    invitation?: Invitation;
    defaultMessage: string;
}

export default function Share({ invitation, defaultMessage }: SharePageProps) {
    const [message, setMessage] = useState(invitation?.whatsapp_message || defaultMessage);
    const [previewMessage, setPreviewMessage] = useState('');

    useEffect(() => {
        const preview = message.replace('[recipient_name]', 'John Doe').replace('[website_link]', 'https://yoursite.com/invitation/abc123');
        setPreviewMessage(preview);
    }, [message]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Share" />

            <InvitationsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Pengaturan Share WhatsApp" description="Atur nomor WhatsApp dan template pesan untuk memudahkan tamu berbagi undangan" />

                    {/* Info Box */}
                    <div className="rounded-lg border bg-muted/50 p-4">
                        <div className="flex gap-3">
                            <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                            <div className="text-sm">
                                <p className="mb-1 font-medium">Informasi</p>
                                <p>Template pesan ini akan digunakan ketika Anda mengklik tombol "Share via WhatsApp" pada undangan. Gunakan placeholder berikut:</p>
                                <ul className="mt-2 list-inside list-disc space-y-1">
                                    <li>
                                        <code className="rounded px-1">[recipient_name]</code> - Akan diganti dengan nama penerima
                                    </li>
                                    <li>
                                        <code className="rounded px-1">[website_link]</code> - Akan diganti dengan link undangan
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <Form {...ShareController.update.form()} options={{ preserveScroll: true }} className="space-y-6">
                        {({ processing, errors }) => (
                            <>
                                {/* Nomor WhatsApp */}
                                <div className="grid gap-2">
                                    <Label htmlFor="whatsapp_number">Nomor WhatsApp</Label>
                                    <Input
                                        id="whatsapp_number"
                                        name="whatsapp_number"
                                        type="tel"
                                        placeholder="62xxx"
                                        defaultValue={invitation?.whatsapp_number || ''}
                                        required
                                    />
                                    <p className="text-sm text-muted-foreground">Format: 62xxx (nomor Indonesia)</p>
                                    <InputError message={errors.whatsapp_number} />
                                </div>

                                {/* Template Pesan WhatsApp */}
                                <div className="grid gap-2">
                                    <Label htmlFor="whatsapp_message">
                                        Template Pesan WhatsApp
                                        <span className="ml-1 text-red-500">*</span>
                                    </Label>
                                    <Textarea
                                        id="whatsapp_message"
                                        name="whatsapp_message"
                                        placeholder={defaultMessage}
                                        rows={12}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        className="font-mono text-sm"
                                    />
                                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                                        <div className="flex gap-2">
                                            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                                            <p className="text-sm text-amber-900">
                                                Pastikan template mengandung <code className="rounded bg-white px-1">[recipient_name]</code> dan{' '}
                                                <code className="rounded bg-white px-1">[website_link]</code>
                                            </p>
                                        </div>
                                    </div>
                                    <InputError message={errors.whatsapp_message} />
                                </div>

                                {/* Preview Pesan */}
                                <div className="rounded-lg border bg-muted/50 p-4">
                                    <p className="mb-3 text-sm font-medium">Preview Pesan:</p>
                                    <div className="rounded-lg border p-4">
                                        <p className="text-sm break-words whitespace-pre-wrap">{previewMessage}</p>
                                    </div>
                                    <p className="mt-2 text-xs text-muted-foreground">Contoh dengan nama "John Doe" dan link dummy</p>
                                </div>

                                {/* Submit */}
                                <div className="flex items-center gap-4">
                                    <Button disabled={processing} data-test="update-share-button">
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
