import { Button } from '@/components/ui/button';
import { Disc3 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToggleMusicProps {
    isPlaying: boolean;
    onToggleMusic: () => void;
    scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export function ToggleMusic({ isPlaying, onToggleMusic, scrollContainerRef }: ToggleMusicProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const container = scrollContainerRef?.current;
        if (!container) return;

        const handleScroll = () => {
            setIsVisible(false);

            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            const timeout = setTimeout(() => {
                setIsVisible(true);
            }, 150);

            setScrollTimeout(timeout);
        };

        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, [scrollContainerRef, scrollTimeout]);

    return (
        <div className="pointer-events-none sticky right-4 bottom-4 left-4 z-50 w-full">
            <div className="flex w-full items-center justify-end px-4">
                <div
                    className={`bg-pallet-3 pointer-events-auto flex items-center justify-center gap-2 rounded-full p-1 transition-all duration-300 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                >
                    <Button size="icon" variant="pallet_1" className="text-[var(--pallet-5)]" onClick={onToggleMusic} title={isPlaying ? 'Pause Musik' : 'Putar Musik'}>
                        <Disc3 className={isPlaying ? 'animate-spin' : ''} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
