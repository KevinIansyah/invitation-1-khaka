import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

interface AlertDeleteDialogProps {
    title?: string;
    description: string;
    deleteUrl: string;
    tooltipText?: string;
}

export function AlertDeleteDialog({ title = 'Apakah Anda yakin?', description, deleteUrl, tooltipText = 'Hapus' }: AlertDeleteDialogProps) {
    return (
        <Tooltip>
            <AlertDialog>
                <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="h-8 w-8">
                            <Trash2 className="!h-4 !w-4" />
                        </Button>
                    </AlertDialogTrigger>
                </TooltipTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>{description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Link href={deleteUrl} method="delete" as="button">
                                Hapus
                            </Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <TooltipContent>
                <p>{tooltipText}</p>
            </TooltipContent>
        </Tooltip>
    );
}
