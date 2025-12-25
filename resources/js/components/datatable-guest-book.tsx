import { AlertDeleteDialog } from '@/components/alert-delete-dialog';
import { DrawerCreateGuest } from '@/components/drawer-create-guest';
import { DrawerEditGuest } from '@/components/drawer-edit-guest';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useDataTable } from '@/hooks/use-datatable';
import { useUrlSearch } from '@/hooks/use-url-search';
import type { GuestBook, Invitation } from '@/types';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, VisibilityState } from '@tanstack/react-table';
import { ChevronDown, ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, Copy, Pencil, Search, SendHorizonal } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

interface DataTableProps {
    data: GuestBook[];
    pageIndex: number;
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
    totalItems: number;
    perPage: number;
    invitation?: Invitation;
    initialFilters?: {
        search?: string;
    };
}

export function DataTableGuestBook({ data, pageIndex, setPageIndex, totalPages, totalItems, perPage, invitation, initialFilters = {} }: DataTableProps) {
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [editingGuestId, setEditingGuestId] = React.useState<number | null>(null);
    const { searchValue, setSearchValue, getSearchFromUrl } = useUrlSearch(initialFilters.search);
    const { debouncedSearch, goToPage, changePageSize, canPreviousPage, canNextPage } = useDataTable({
        pageIndex,
        setPageIndex,
        totalPages,
        getSearchFromUrl,
        onlyFields: ['guestbooks'],
    });

    const handleCopyInvitation = async (guestName: string, guestSlug: string) => {
        if (!invitation?.whatsapp_message) {
            toast.error('Template pesan belum diatur', {
                description: 'Silakan atur template pesan WhatsApp terlebih dahulu di menu Pengaturan Share',
            });
            return;
        }

        const invitationUrl = `${window.location.origin}/?to=${guestSlug}`;

        const message = invitation.whatsapp_message.replace('[recipient_name]', guestName).replace('[website_link]', invitationUrl);

        try {
            await navigator.clipboard.writeText(message);

            toast.success('Pesan berhasil disalin!', {
                description: `Pesan undangan untuk ${guestName} telah disalin ke clipboard`,
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error('Gagal menyalin', {
                description: 'Terjadi kesalahan saat menyalin pesan undangan',
            });
        }
    };

    const handleShareWhatsApp = (guestName: string, guestSlug: string, guestContact?: string | null) => {
        if (!invitation?.whatsapp_message) {
            toast.error('Template pesan belum diatur', {
                description: 'Silakan atur template pesan WhatsApp terlebih dahulu di menu Pengaturan Share',
            });
            return;
        }

        const invitationUrl = `${window.location.origin}/?to=${guestSlug}`;

        const message = invitation.whatsapp_message.replace('[recipient_name]', guestName).replace('[website_link]', invitationUrl);

        let whatsappUrl;
        if (guestContact) {
            const cleanContact = guestContact.replace(/\D/g, '');
            // const cleanContact = guestContact.replace(/[^0-9+]/g, '');
            whatsappUrl = `https://wa.me/${cleanContact}?text=${encodeURIComponent(message)}`;
        } else {
            // whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
            whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        }

        window.open(whatsappUrl, '_blank');
    };

    const handleCopyContact = async (contact: string) => {
        if (!contact) return;

        try {
            await navigator.clipboard.writeText(contact);
            toast.success('Berhasil disalin!', {
                description: `Nomor ${contact} telah disalin ke clipboard`,
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error('Gagal menyalin', {
                description: 'Terjadi kesalahan saat menyalin nomor',
            });
        }
    };

    const getCategoryStyle = (category: string) => {
        const categoryStyles: Record<string, string> = {
            keluarga: 'border-none bg-chart-2 text-white dark:text-black',
            teman: 'border-none bg-chart-3 text-white dark:text-black',
            'rekan-kerja': 'border-none bg-chart-4 text-white dark:text-black',
            tetangga: 'border-none bg-chart-5 text-white dark:text-black',
            lainnya: 'border-none bg-secondary',
        };
        return categoryStyles[category] || categoryStyles.lainnya;
    };

    const getCategoryLabel = (category: string) => {
        const categoryLabels: Record<string, string> = {
            keluarga: 'Keluarga',
            teman: 'Teman',
            'rekan-kerja': 'Rekan Kerja',
            tetangga: 'Tetangga',
            lainnya: 'Lainnya',
        };
        return categoryLabels[category] || category;
    };

    const columns: ColumnDef<GuestBook>[] = [
        {
            accessorKey: 'name',
            header: 'Nama',
            cell: ({ row }) => <div className="">{row.getValue('name') || '-'}</div>,
        },
        {
            accessorKey: 'contact',
            header: 'Kontak',
            cell: ({ row }) => {
                const contact = row.getValue('contact') as string;

                return (
                    <div className={contact ? 'cursor-pointer transition-colors hover:text-primary' : ''} onClick={() => contact && handleCopyContact(contact)}>
                        {contact || '-'}
                    </div>
                );
            },
        },
        {
            accessorKey: 'category',
            header: 'Kategori',
            cell: ({ row }) => {
                const category = row.getValue('category') as string;

                if (!category) return '-';

                return (
                    <Badge variant="outline" className={getCategoryStyle(category)}>
                        {getCategoryLabel(category)}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'opened_at',
            header: 'Status Buka',
            cell: ({ row }) => {
                const isOpened = row.getValue('opened_at') as boolean;

                return (
                    <Badge variant="outline" className={isOpened ? 'border-none bg-chart-4 text-white dark:text-black' : 'border-none bg-secondary'}>
                        {isOpened ? 'Sudah dibuka' : 'Belum dibuka'}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'note',
            header: 'Catatan',
            cell: ({ row }) => {
                const note = row.getValue('note') as string;
                return <div className="max-w-md truncate">{note || '-'}</div>;
            },
        },
        {
            accessorKey: 'action',
            header: 'Aksi',
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-1">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="default" size="sm" className="h-8 w-8" onClick={() => handleCopyInvitation(row.original.name, row.original.slug)}>
                                    <Copy className="!h-3.5 !w-3.5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Salin Link Undangan</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="default"
                                    size="sm"
                                    className="h-8 w-8"
                                    onClick={() => handleShareWhatsApp(row.original.name, row.original.slug, row.original.contact)}
                                >
                                    <SendHorizonal className="!h-3.5 !w-3.5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{row.original.contact ? 'Kirim ke WhatsApp' : 'Share via WhatsApp'}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="secondary" size="sm" className="h-8 w-8" onClick={() => setEditingGuestId(row.original.id)}>
                                    <Pencil className="!h-3.5 !w-3.5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit Tamu</p>
                            </TooltipContent>
                        </Tooltip>

                        <AlertDeleteDialog
                            description={`Tindakan ini tidak dapat dibatalkan. Data tamu "${row.original.name}" akan dihapus secara permanen dari sistem.`}
                            deleteUrl={`/dashboard/guest-book/${row.original.id}`}
                            tooltipText="Hapus Tamu"
                        />
                    </div>
                );
            },
        },
    ];

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
        debouncedSearch(value);
    };

    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
            pagination: {
                pageIndex,
                pageSize: perPage,
            },
        },
        pageCount: totalPages,
        manualPagination: true,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full">
            <div className="flex flex-col items-center justify-between gap-2 pb-4 md:flex-row">
                <InputGroup className="max-w-sm">
                    <InputGroupInput placeholder="Filter nama atau kategori..." value={searchValue} onChange={handleSearchChange} />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                </InputGroup>
                <div className="flex w-full gap-2 md:w-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full md:w-30">
                                Kolom <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllLeafColumns()
                                .filter((c) => c.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem key={column.id} checked={column.getIsVisible()} onCheckedChange={() => column.toggleVisibility()}>
                                        {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DrawerCreateGuest />
                </div>
            </div>
            <div className="overflow-hidden rounded-md border-b">
                <Table>
                    <TableHeader className="bg-primary hover:bg-primary">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="font-medium text-white capitalize dark:text-black">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {searchValue ? 'Tidak ada hasil yang ditemukan' : 'Tidak ada data'}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between gap-8 pt-4">
                <div className="hidden flex-1 text-sm md:flex">
                    Menampilkan {Math.min(pageIndex * perPage + 1, totalItems)} sampai {Math.min((pageIndex + 1) * perPage, totalItems)} dari {totalItems} hasil
                    {searchValue && <span className="ml-1">untuk "{searchValue}"</span>}
                </div>
                <div className="flex w-full items-center gap-8 md:w-fit">
                    <div className="hidden items-center gap-2 md:flex">
                        <Label htmlFor="rows-per-page" className="text-sm font-medium">
                            Baris per halaman
                        </Label>
                        <Select value={`${perPage}`} onValueChange={(value) => changePageSize(Number(value))}>
                            <SelectTrigger className="w-20" id="rows-per-page">
                                <SelectValue placeholder={perPage} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex w-fit items-center justify-center text-sm font-medium">
                        Halaman {pageIndex + 1} dari {totalPages}
                    </div>

                    <div className="ml-auto flex items-center gap-2 lg:ml-0">
                        <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => goToPage(0)} disabled={!canPreviousPage}>
                            <span className="sr-only">Go to first page</span>
                            <ChevronsLeftIcon />
                        </Button>
                        <Button variant="outline" className="size-8" size="sm" onClick={() => goToPage(pageIndex - 1)} disabled={!canPreviousPage}>
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeftIcon />
                        </Button>
                        <Button variant="outline" className="size-8" size="sm" onClick={() => goToPage(pageIndex + 1)} disabled={!canNextPage}>
                            <span className="sr-only">Go to next page</span>
                            <ChevronRightIcon />
                        </Button>
                        <Button variant="outline" className="hidden size-8 lg:flex" size="sm" onClick={() => goToPage(totalPages - 1)} disabled={!canNextPage}>
                            <span className="sr-only">Go to last page</span>
                            <ChevronsRightIcon />
                        </Button>
                    </div>
                </div>
            </div>

            {editingGuestId && (
                <DrawerEditGuest
                    guestId={editingGuestId}
                    open={!!editingGuestId}
                    onOpenChange={(open) => {
                        if (!open) setEditingGuestId(null);
                    }}
                />
            )}
        </div>
    );
}
