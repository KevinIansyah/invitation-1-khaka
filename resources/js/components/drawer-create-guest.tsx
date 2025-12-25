import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import guestBook from '@/routes/guest-book';
import type { GuestBookFormData } from '@/types';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import * as React from 'react';

export function DrawerCreateGuest() {
    const { data, setData, post, processing, errors, reset } = useForm<GuestBookFormData>({
        name: '',
        contact: '',
        category: 'lainnya',
        is_attending: false,
        total_guests: 1,
        message: '',
        note: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(guestBook.store().url, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <Drawer direction="bottom">
            <DrawerTrigger asChild>
                <Button className="w-full md:w-30">
                    Tambah
                    <Plus />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-screen">
                <div className="mx-auto w-full max-w-lg overflow-y-auto">
                    <DrawerHeader>
                        <DrawerTitle>Tambah Tamu Baru</DrawerTitle>
                        <DrawerDescription>Isi formulir di bawah untuk menambahkan tamu baru ke buku tamu</DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Name */}
                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    Nama <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="name"
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
                                <Label htmlFor="contact">Kontak</Label>
                                <Input
                                    id="contact"
                                    type="text"
                                    name="contact"
                                    tabIndex={2}
                                    placeholder="No. Whatsapp (62xxx)"
                                    value={data.contact}
                                    onChange={(e) => setData('contact', e.target.value)}
                                />
                                <InputError message={errors.contact} />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="grid gap-2">
                            <Label htmlFor="category">
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
                            <Label htmlFor="note">Catatan Internal</Label>
                            <Textarea
                                id="note"
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
                                Simpan Tamu
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="outline" type="button">
                                    Batal
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
