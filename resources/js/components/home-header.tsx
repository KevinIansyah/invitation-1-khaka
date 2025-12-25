import { Button } from '@/components/ui/button';
import { Clock3, Disc3, Gift, House, MapPinHouse, Send } from 'lucide-react';

interface HomeHeaderProps {
    isPlaying: boolean;
    onToggleMusic: () => void;
    containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function HomeHeader({ isPlaying, onToggleMusic, containerRef }: HomeHeaderProps) {
    const scrollToSection = (sectionId: string) => {
        const container = containerRef?.current;
        if (!container) return;

        const section = container.querySelector(`#${sectionId}`);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <header className="sticky right-0 bottom-4 left-0 z-50 w-full">
            <div className="flex w-full items-center justify-center">
                <div className="bg-pallet-3 flex items-center justify-center gap-2 rounded-full p-2">
                    <Button size="icon" variant="pallet_1" className="text-[var(--pallet-5)]" onClick={() => scrollToSection('home')} title="Beranda">
                        <House />
                    </Button>

                    <Button size="icon" variant="pallet_1" className="text-[var(--pallet-5)]" onClick={() => scrollToSection('time')} title="Waktu Acara">
                        <Clock3 />
                    </Button>

                    <Button size="icon" variant="pallet_1" className="text-[var(--pallet-5)]" onClick={() => scrollToSection('location')} title="Lokasi">
                        <MapPinHouse />
                    </Button>

                    <Button size="icon" variant="pallet_1" className="text-[var(--pallet-5)]" onClick={() => scrollToSection('gift')} title="Hadiah">
                        <Gift />
                    </Button>

                    <Button size="icon" variant="pallet_1" className="text-[var(--pallet-5)]" onClick={() => scrollToSection('wishes')} title="Ucapan">
                        <Send />
                    </Button>

                    <Button size="icon" variant="pallet_1" className="text-[var(--pallet-5)]" onClick={onToggleMusic} title={isPlaying ? 'Pause Musik' : 'Putar Musik'}>
                        <Disc3 className={isPlaying ? 'animate-spin' : ''} />
                    </Button>
                </div>
            </div>
        </header>
    );
}
