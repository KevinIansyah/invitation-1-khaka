import FamilyController from '@/actions/App/Http/Controllers/Invitation/FamilyController';
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
import { Image } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan Keluarga',
        href: edit().url,
    },
];

interface Invitation {
    id?: number;
    child_name?: string;
    child_photo?: string;
    father_name?: string;
    mother_name?: string;
}

interface FamilyPageProps {
    invitation?: Invitation;
}

export default function Family({ invitation }: FamilyPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Keluarga" />

            <InvitationsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Informasi Keluarga" description="Lengkapi informasi keluarga untuk ditampilkan pada undangan" />

                    <Form {...FamilyController.update.form()} encType="multipart/form-data" options={{ preserveScroll: true }} className="space-y-6">
                        {({ processing, errors }) => (
                            <>
                                {/* Nama Anak */}
                                <div className="grid gap-2">
                                    <Label htmlFor="child_name">Nama Anak</Label>
                                    <Input id="child_name" name="child_name" type="text" placeholder="Nama lengkap anak" defaultValue={invitation?.child_name || ''} required />
                                    <InputError message={errors.child_name} />
                                </div>

                                {/* Foto Anak */}
                                <div className="grid gap-2">
                                    <Label htmlFor="child_photo">Foto Anak</Label>

                                    {/* Tampilkan foto yang sudah ada */}
                                    {invitation?.child_photo && (
                                        <div className="rounded-lg border bg-muted/50 p-4">
                                            <div className="items:start flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                                            <Image className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <p className="text-sm font-medium">Foto Saat Ini</p>
                                                    </div>

                                                    <img src={`/storage/${invitation.child_photo}`} alt="Foto anak" className="h-32 w-32 rounded-lg border object-cover" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <Input id="child_photo" name="child_photo" type="file" accept="image/*" />
                                    <p className="text-sm text-muted-foreground">Format JPG, PNG. Maksimal 2MB.</p>
                                    <InputError message={errors.child_photo} />
                                </div>

                                {/* Nama Ayah */}
                                <div className="grid gap-2">
                                    <Label htmlFor="father_name">Nama Ayah</Label>
                                    <Input id="father_name" name="father_name" type="text" placeholder="Nama lengkap ayah" defaultValue={invitation?.father_name || ''} required />
                                    <InputError message={errors.father_name} />
                                </div>

                                {/* Nama Ibu */}
                                <div className="grid gap-2">
                                    <Label htmlFor="mother_name">Nama Ibu</Label>
                                    <Input id="mother_name" name="mother_name" type="text" placeholder="Nama lengkap ibu" defaultValue={invitation?.mother_name || ''} required />
                                    <InputError message={errors.mother_name} />
                                </div>

                                {/* Submit */}
                                <div className="flex items-center gap-4">
                                    <Button disabled={processing} data-test="update-family-button">
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
