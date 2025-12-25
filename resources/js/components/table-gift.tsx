import { AlertDeleteDialog } from '@/components/alert-delete-dialog';
import { DrawerCreateGift } from '@/components/drawer-create-gift';
import { DrawerEditGift } from '@/components/drawer-edit-gift';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { Gift } from '@/types';
import { Copy, Pencil } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

interface TableProps {
    data: Gift[];
}

export function TableGift({ data }: TableProps) {
    const [editingGiftId, setEditingGiftId] = React.useState<number | null>(null);

    const handleCopyAccount = async (accountNumber: string, accountName: string, bankName: string) => {
        if (!accountNumber) return;

        try {
            const textToCopy = `${bankName}\n${accountName}\n${accountNumber}`;
            await navigator.clipboard.writeText(textToCopy);
            toast.success('Berhasil disalin!', {
                description: `Informasi rekening telah disalin ke clipboard`,
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error('Gagal menyalin', {
                description: 'Terjadi kesalahan saat menyalin informasi rekening',
            });
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between pb-4">
                <DrawerCreateGift />
            </div>

            <div className="overflow-hidden rounded-md border-b">
                <Table>
                    <TableHeader className="bg-primary hover:bg-primary">
                        <TableRow>
                            <TableHead className="font-medium text-white capitalize dark:text-black">Nama Bank</TableHead>
                            <TableHead className="font-medium text-white capitalize dark:text-black">Nama Penerima</TableHead>
                            <TableHead className="font-medium text-white capitalize dark:text-black">Nomor Rekening</TableHead>
                            <TableHead className="font-medium text-white capitalize dark:text-black">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.length ? (
                            data.map((gift) => (
                                <TableRow key={gift.id}>
                                    <TableCell className="font-medium">{gift.bank_name}</TableCell>
                                    <TableCell>{gift.account_name}</TableCell>
                                    <TableCell>
                                        <div
                                            className="cursor-pointer hover:text-primary"
                                            onClick={() => handleCopyAccount(gift.account_number, gift.account_name, gift.bank_name)}
                                        >
                                            {gift.account_number}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        className="h-8 w-8"
                                                        onClick={() => handleCopyAccount(gift.account_number, gift.account_name, gift.bank_name)}
                                                    >
                                                        <Copy className="!h-3.5 !w-3.5" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Salin Info Rekening</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="secondary" size="sm" className="h-8 w-8" onClick={() => setEditingGiftId(gift.id)}>
                                                        <Pencil className="!h-3.5 !w-3.5" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Edit Rekening</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            <AlertDeleteDialog
                                                description={`Tindakan ini tidak dapat dibatalkan. Rekening ${gift.bank_name} a.n. ${gift.account_name} akan dihapus secara permanen dari sistem.`}
                                                deleteUrl={`/dashboard/invitations/gift/${gift.id}`}
                                                tooltipText="Hapus Rekening"
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    Tidak ada data rekening hadiah
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {editingGiftId && (
                <DrawerEditGift
                    giftId={editingGiftId}
                    open={!!editingGiftId}
                    onOpenChange={(open) => {
                        if (!open) setEditingGiftId(null);
                    }}
                />
            )}
        </div>
    );
}
