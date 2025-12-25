import MusicController from '@/actions/App/Http/Controllers/Invitation/MusicController';
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
import { Music as MusicIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan Musik',
        href: edit().url,
    },
];

interface Invitation {
    id?: number;
    music?: string;
}

interface MusicPageProps {
    invitation?: Invitation;
}

export default function Music({ invitation }: MusicPageProps) {
    // const [isDeleting, setIsDeleting] = useState(false);

    // const handleDelete = () => {
    //     if (!confirm('Apakah Anda yakin ingin menghapus musik ini?')) {
    //         return;
    //     }

    //     setIsDeleting(true);
    //     router.delete(MusicController.destroy.url(), {
    //         preserveScroll: true,
    //         onFinish: () => setIsDeleting(false),
    //     });
    // };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Musik" />

            <InvitationsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Musik Undangan" description="Unggah musik latar yang akan diputar pada undangan" />

                    {/* Tampilkan musik yang sudah ada */}
                    {invitation?.music && (
                        <div className="rounded-lg border bg-muted/50 p-4">
                            <div className="items:start flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                            <MusicIcon className="h-4 w-4 text-primary" />
                                        </div>
                                        <p className="text-sm font-medium">Musik Saat Ini</p>
                                    </div>

                                    <audio controls className="mt-2" src={`/storage/${invitation.music}`}>
                                        Browser Anda tidak mendukung audio player.
                                    </audio>
                                </div>
                            </div>
                        </div>
                    )}

                    <Form {...MusicController.update.form()} encType="multipart/form-data" options={{ preserveScroll: true }} className="space-y-6">
                        {({ processing, errors }) => (
                            <>
                                {/* Upload Musik */}
                                <div className="grid gap-2">
                                    <Label htmlFor="music">{invitation?.music ? 'Ganti File Musik' : 'File Musik'}</Label>
                                    <Input id="music" name="music" type="file" accept="audio/mpeg,audio/mp3" required={!invitation?.music} />

                                    <p className="text-sm text-muted-foreground">Format MP3. Maksimal 5MB. Pilih musik yang sesuai dengan tema acara Anda.</p>

                                    <InputError message={errors.music} />
                                </div>

                                {/* Submit */}
                                <div className="flex items-center gap-4">
                                    <Button disabled={processing} data-test="update-music-button">
                                        {invitation?.music ? 'Ganti Musik' : 'Unggah Musik'}
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
