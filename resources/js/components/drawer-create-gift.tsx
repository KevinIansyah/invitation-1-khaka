import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import type { GiftFormData } from '@/types';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import * as React from 'react';

export function DrawerCreateGift() {
    const { data, setData, post, processing, errors, reset } = useForm<GiftFormData>({
        bank_name: '',
        account_number: '',
        account_name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dashboard/invitations/gift', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <Drawer direction="bottom">
            <DrawerTrigger asChild>
                <Button className="w-full md:w-auto">
                    Tambah
                    <Plus />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-screen">
                <div className="mx-auto w-full max-w-lg overflow-y-auto">
                    <DrawerHeader>
                        <DrawerTitle>Tambah Rekening Hadiah</DrawerTitle>
                        <DrawerDescription>Isi formulir di bawah untuk menambahkan rekening hadiah baru</DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 p-4">
                        {/* Nama Bank */}
                        <div className="grid gap-2">
                            <Label htmlFor="bank_name">
                                Nama Bank <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="bank_name"
                                type="text"
                                name="bank_name"
                                required
                                autoFocus
                                tabIndex={1}
                                placeholder="Contoh: Bank BCA, GoPay, OVO"
                                value={data.bank_name}
                                onChange={(e) => setData('bank_name', e.target.value)}
                                className="bg-background"
                            />
                            <InputError message={errors.bank_name} />
                        </div>

                        {/* Nama Penerima */}
                        <div className="grid gap-2">
                            <Label htmlFor="account_name">
                                Nama Penerima <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="account_name"
                                type="text"
                                name="account_name"
                                required
                                tabIndex={2}
                                placeholder="Nama lengkap pemilik rekening"
                                value={data.account_name}
                                onChange={(e) => setData('account_name', e.target.value)}
                                className="bg-background"
                            />
                            <InputError message={errors.account_name} />
                        </div>

                        {/* Nomor Rekening */}
                        <div className="grid gap-2">
                            <Label htmlFor="account_number">
                                Nomor Rekening <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="account_number"
                                type="text"
                                name="account_number"
                                required
                                tabIndex={3}
                                placeholder="Nomor rekening atau nomor e-wallet"
                                value={data.account_number}
                                onChange={(e) => setData('account_number', e.target.value)}
                                className="bg-background"
                            />
                            <InputError message={errors.account_number} />
                        </div>

                        <DrawerFooter className="px-0">
                            <Button type="submit" disabled={processing} tabIndex={4}>
                                {processing && <Spinner />}
                                Simpan Rekening
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
