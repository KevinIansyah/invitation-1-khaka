// drawer-edit-guest.tsx
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import type { GuestBookFormData } from '@/types';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import * as React from 'react';
import { toast } from 'sonner';

interface DrawerEditGuestProps {
    guestId: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DrawerEditGuest({ guestId, open, onOpenChange }: DrawerEditGuestProps) {
    const [loading, setLoading] = React.useState(false);

    const { data, setData, put, processing, errors } = useForm<GuestBookFormData>({
        name: '',
        contact: '',
        category: 'lainnya',
        is_attending: false,
        total_guests: 1,
        message: '',
        note: '',
    });

    React.useEffect(() => {
        if (open && guestId) {
            setLoading(true);
            axios
                .get(`/dashboard/guest-book/${guestId}/edit`)
                .then((response) => {
                    const guest = response.data;
                    setData({
                        name: guest.name || '',
                        contact: guest.contact || '',
                        category: guest.category || 'lainnya',
                        is_attending: guest.is_attending || false,
                        total_guests: guest.total_guests || 1,
                        message: guest.message || '',
                        note: guest.note || '',
                    });
                })
                .catch(() => {
                    toast.error('Gagal!', {
                        description: 'Terjadi kesalahan saat mengambil data tamu',
                    });
                    onOpenChange(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [open, guestId, setData, onOpenChange]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/dashboard/guest-book/${guestId}`, {
            preserveScroll: true,
            onSuccess: () => {
                onOpenChange(false);
            },
            onError: () => {},
        });
    };

    return (
        <Drawer direction="bottom" open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="h-screen">
                <div className="mx-auto w-full max-w-lg overflow-y-auto">
                    <DrawerHeader>
                        <DrawerTitle>Edit Tamu</DrawerTitle>
                        <DrawerDescription>Perbarui informasi tamu di buku tamu</DrawerDescription>
                    </DrawerHeader>

                    {loading ? (
                        <div className="grid gap-4 p-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-name">
                                        Nama <span className="text-destructive">*</span>
                                    </Label>
                                    <Skeleton className="h-10 w-full" />
                                </div>

                                {/* Contact */}
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-contact">Kontak</Label>
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>

                            {/* Category */}
                            <div className="grid gap-2">
                                <Label htmlFor="edit-category">
                                    Kategori <span className="text-destructive">*</span>
                                </Label>
                                <Skeleton className="h-10 w-full" />
                            </div>

                            {/* Note */}
                            <div className="grid gap-2">
                                <Label htmlFor="edit-note">Catatan Internal</Label>
                                <Skeleton className="h-16 w-full" />
                            </div>

                            <DrawerFooter className="px-0">
                                <Button type="button" disabled tabIndex={8}>
                                    Update Tamu
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" type="button">
                                        Batal
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid gap-4 p-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-name">
                                        Nama <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="edit-name"
                                        type="text"
                                        name="name"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        placeholder="Masukkan nama lengkap"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="bg-background"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Contact */}
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-contact">Kontak</Label>
                                    <Input
                                        id="edit-contact"
                                        type="text"
                                        name="contact"
                                        tabIndex={2}
                                        placeholder="No. HP atau Email"
                                        value={data.contact}
                                        onChange={(e) => setData('contact', e.target.value)}
                                    />
                                    <InputError message={errors.contact} />
                                </div>
                            </div>

                            {/* Category */}
                            <div className="grid gap-2">
                                <Label htmlFor="edit-category">
                                    Kategori <span className="text-destructive">*</span>
                                </Label>
                                <Select name="category" value={data.category} onValueChange={(value) => setData('category', value)}>
                                    <SelectTrigger tabIndex={3}>
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="keluarga">Keluarga</SelectItem>
                                        <SelectItem value="teman">Teman</SelectItem>
                                        <SelectItem value="rekan-kerja">Rekan Kerja</SelectItem>
                                        <SelectItem value="tetangga">Tetangga</SelectItem>
                                        <SelectItem value="lainnya">Lainnya</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category} />
                            </div>

                            {/* Note */}
                            <div className="grid gap-2">
                                <Label htmlFor="edit-note">Catatan Internal</Label>
                                <Textarea
                                    id="edit-note"
                                    name="note"
                                    tabIndex={7}
                                    placeholder="Catatan pribadi (tidak terlihat oleh tamu)"
                                    rows={3}
                                    value={data.note}
                                    onChange={(e) => setData('note', e.target.value)}
                                />
                                <InputError message={errors.note} />
                            </div>

                            <DrawerFooter className="px-0">
                                <Button type="submit" disabled={processing} tabIndex={8}>
                                    {processing && <Spinner />}
                                    Update Tamu
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" type="button">
                                        Batal
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
