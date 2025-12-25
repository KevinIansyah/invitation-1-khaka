// drawer-edit-guest.tsx
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import type { GiftFormData } from '@/types';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import * as React from 'react';
import { toast } from 'sonner';

interface DrawerEditGuestProps {
    giftId: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DrawerEditGift({ giftId, open, onOpenChange }: DrawerEditGuestProps) {
    const [loading, setLoading] = React.useState(false);

    const { data, setData, put, processing, errors } = useForm<GiftFormData>({
        bank_name: '',
        account_number: '',
        account_name: '',
    });

    React.useEffect(() => {
        if (open && giftId) {
            setLoading(true);
            axios
                .get(`/dashboard/invitations/gift/${giftId}/edit`)
                .then((response) => {
                    const gift = response.data;
                    setData({
                        bank_name: gift.bank_name || '',
                        account_number: gift.account_number || '',
                        account_name: gift.account_name || '',
                    });
                })
                .catch(() => {
                    toast.error('Gagal!', {
                        description: 'Terjadi kesalahan saat mengambil data rekening hadiah',
                    });
                    onOpenChange(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [open, giftId, setData, onOpenChange]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/dashboard/invitations/gift/${giftId}`, {
            preserveScroll: true,
            onSuccess: () => {
                onOpenChange(false);
            },
        });
    };

    return (
        <Drawer direction="bottom" open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="h-screen">
                <div className="mx-auto w-full max-w-lg overflow-y-auto">
                    <DrawerHeader>
                        <DrawerTitle>Edit Rekening Hadiah</DrawerTitle>
                        <DrawerDescription>Perbarui informasi rekening hadiah</DrawerDescription>
                    </DrawerHeader>

                    {loading ? (
                        <div className="grid gap-4 p-4">
                            {/* Nama Bank */}
                            <div className="grid gap-2">
                                <Label htmlFor="bank_name">
                                    Nama Bank <span className="text-destructive">*</span>
                                </Label>
                                <Skeleton className="h-10 w-full" />
                            </div>

                            {/* Nama Penerima */}
                            <div className="grid gap-2">
                                <Label htmlFor="account_name">
                                    Nama Penerima <span className="text-destructive">*</span>
                                </Label>
                                <Skeleton className="h-10 w-full" />
                            </div>

                            {/* Nomor Rekening */}
                            <div className="grid gap-2">
                                <Label htmlFor="account_number">
                                    Nomor Rekening <span className="text-destructive">*</span>
                                </Label>
                                <Skeleton className="h-10 w-full" />
                            </div>

                            <DrawerFooter className="px-0">
                                <Button type="button" disabled tabIndex={8}>
                                    Update Rekening
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
                                <Button type="submit" disabled={processing} tabIndex={8}>
                                    {processing && <Spinner />}
                                    Update Rekening
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
