import WishController from '@/actions/App/Http/Controllers/WishController';
import InputError from '@/components/input-error';
import { ToggleMusic } from '@/components/toggle-music';
import { Button } from '@/components/ui/button';
import { InputHome } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TextareaHome } from '@/components/ui/textarea';
import HomeLayout from '@/layouts/home-layout';
import type { Gift, GuestBook, Invitation, Wish } from '@/types';
import { Form, Head, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { GiftIcon, Mail, MapPinned, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Element2 from '../../../public/images/element-2.svg';
import Element3 from '../../../public/images/element-3.svg';
import Element4 from '../../../public/images/element-4.svg';
import Element5 from '../../../public/images/element-5.svg';
import Ornament1 from '../../../public/images/ornament-1.svg';
import Person2 from '../../../public/images/person-2.jpg';

export default function Home() {
    const { guest, invitation, wishes, gifts } = usePage<{
        guest?: GuestBook;
        invitation?: Invitation;
        wishes: Wish[];
        gifts: Gift[];
    }>().props;

    const [opened, setOpened] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Segera';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const getRelativeTime = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Baru saja';
        if (diffMins < 60) return `${diffMins} menit yang lalu`;
        if (diffHours < 24) return `${diffHours} jam yang lalu`;
        return `${diffDays} hari yang lalu`;
    };

    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if (!invitation?.event_date) return;

        const targetDate = new Date(invitation.event_date);
        if (invitation.event_time) {
            const [hours, minutes] = invitation.event_time.split(':');
            targetDate.setHours(parseInt(hours), parseInt(minutes));
        }

        const interval = setInterval(() => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff > 0) {
                setCountdown({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / 1000 / 60) % 60),
                    seconds: Math.floor((diff / 1000) % 60),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [invitation?.event_date, invitation?.event_time]);

    useEffect(() => {
        if (invitation?.music) {
            audioRef.current = new Audio(`/storage/${invitation.music}`);
        } else {
            audioRef.current = new Audio();
        }
        audioRef.current.loop = true;

        return () => {
            audioRef.current?.pause();
        };
    }, [invitation?.music]);

    useEffect(() => {
        if (opened) {
            audioRef.current?.play();
            setIsPlaying(true);
        }
    }, [opened]);

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            audioRef.current?.play();
            setIsPlaying(true);
        }
    };

    const childPhoto = invitation?.child_photo ? `/storage/${invitation.child_photo}` : Person2;

    return (
        <HomeLayout>
            <Head title={invitation?.child_name || 'Undangan Khitanan'} />

            <div className="grid min-h-screen grid-cols-12">
                {/* ================= KONTEN KIRI ================= */}
                <div className="bg-pallet-1 relative isolate col-span-8 hidden items-center justify-center overflow-hidden border-r border-[var(--pallet-5)] text-center lg:flex">
                    <div className="relative z-20 flex flex-col items-center justify-center space-y-6">
                        <motion.h2
                            className="alice-regular text-2xl tracking-widest text-[var(--pallet-5)]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            ACARA KHITAN
                        </motion.h2>
                        <motion.h1
                            className="great-vibes-regular text-6xl text-[var(--pallet-5)]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {invitation?.child_name || 'Nama Anak'}
                        </motion.h1>
                        <div className="flex flex-col items-center space-y-1">
                            <motion.h4
                                className="text-sm text-[var(--pallet-5)]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                Putra dari
                            </motion.h4>
                            <motion.h3
                                className="alice-regular text-lg text-[var(--pallet-5)]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                {invitation?.father_name || 'Nama Ayah'}
                            </motion.h3>
                            <motion.h4
                                className="text-sm text-[var(--pallet-5)]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1 }}
                            >
                                dan
                            </motion.h4>
                            <motion.h3
                                className="alice-regular text-lg text-[var(--pallet-5)]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                            >
                                {invitation?.mother_name || 'Nama Ibu'}
                            </motion.h3>
                        </div>
                        <motion.hr
                            className="w-100 border-t border-[var(--pallet-5)]"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                        />
                        <motion.h2
                            className="alice-regular mb-0 text-lg tracking-widest text-[var(--pallet-5)]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.6 }}
                        >
                            {formatDate(invitation?.event_date ?? '2030-01-01')}
                        </motion.h2>
                    </div>

                    {/* Decorative elements remain the same */}
                    <div className="pointer-events-none absolute inset-0 z-10">
                        <motion.img
                            className="absolute top-2 left-2 h-40 w-40"
                            src={Element4}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 0.9, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                        />
                        <motion.img
                            className="absolute top-2 right-2 h-40 w-40 scale-x-[-1]"
                            src={Element4}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 0.9, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                        />
                        <motion.img
                            className="absolute bottom-2 left-2 h-40 w-40 scale-y-[-1]"
                            src={Element4}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 0.9, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                        />
                        <motion.img
                            className="absolute right-2 bottom-2 h-40 w-40 scale-x-[-1] scale-y-[-1]"
                            src={Element4}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 0.9, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                        />
                    </div>

                    <div className="pointer-events-none absolute inset-0 z-20">
                        <motion.div
                            className="absolute top-12 left-1/2 h-px w-125 -translate-x-1/2 bg-[var(--pallet-5)] opacity-40"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                            style={{ transformOrigin: 'center' }}
                        />
                        <motion.div
                            className="absolute bottom-12 left-1/2 h-px w-125 -translate-x-1/2 bg-[var(--pallet-5)] opacity-40"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 1.3 }}
                            style={{ transformOrigin: 'center' }}
                        />
                        <motion.div
                            className="absolute top-1/2 left-12 h-60 w-px -translate-y-1/2 bg-[var(--pallet-5)] opacity-40"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            style={{ transformOrigin: 'center' }}
                        />
                        <motion.div
                            className="absolute top-1/2 right-12 h-60 w-px -translate-y-1/2 bg-[var(--pallet-5)] opacity-40"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.6, delay: 1.5 }}
                            style={{ transformOrigin: 'center' }}
                        />
                    </div>

                    <div className="pointer-events-none absolute inset-0 z-30">
                        <motion.img
                            className="absolute top-1/2 left-7 w-10 -translate-y-1/2"
                            src={Element3}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 0.9, scale: 1 }}
                            transition={{ duration: 0.6, delay: 1.6, ease: 'easeOut' }}
                        />
                        <motion.img
                            className="absolute top-1/2 right-7 w-10 -translate-y-1/2"
                            src={Element3}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 0.9, scale: 1 }}
                            transition={{ duration: 0.6, delay: 1.6, ease: 'easeOut' }}
                        />
                        <motion.img
                            className="absolute top-1 left-1/2 w-10 -translate-x-1/2 rotate-90"
                            src={Element3}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 0.9, scale: 1 }}
                            transition={{ duration: 0.6, delay: 1.6, ease: 'easeOut' }}
                        />
                        <motion.img
                            className="absolute bottom-1 left-1/2 w-10 -translate-x-1/2 -rotate-90"
                            src={Element3}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 0.9, scale: 1 }}
                            transition={{ duration: 0.6, delay: 1.6, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                {/* ================= KONTEN KANAN ================= */}
                <div className="bg-pallet-1 relative col-span-12 overflow-hidden lg:col-span-4">
                    <AnimatePresence mode="wait">
                        {!opened ? (
                            /* ================= KONTEN SEBELUM DIBUKA ================= */
                            <motion.div key="initial" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                                <img className="h-screen w-full object-cover object-top" src={childPhoto} alt={`Foto ${invitation?.child_name}`} />
                                <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--pallet-1)/0.1] from-25% via-[color:var(--pallet-1)] via-50% to-[color:var(--pallet-1)] to-100%" />
                                <div className="absolute inset-x-0 bottom-5 flex flex-col items-center justify-center space-y-4 p-4 text-center md:space-y-8 md:p-6 lg:bottom-0 lg:space-y-4">
                                    <motion.h2
                                        className="alice-regular text-lg tracking-widest text-[var(--pallet-5)]"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        ACARA KHITAN
                                    </motion.h2>
                                    <motion.h1
                                        className="great-vibes-regular hidden text-5xl leading-14 text-[var(--pallet-5)] lg:block"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                    >
                                        {invitation?.child_name || 'Nama Anak'}
                                    </motion.h1>
                                    <motion.h1
                                        className="great-vibes-regular text-6xl leading-18 text-[var(--pallet-5)] md:text-7xl lg:hidden"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                    >
                                        {invitation?.child_name || 'Nama Anak'}
                                    </motion.h1>
                                    <div className="flex flex-col items-center space-y-1">
                                        <motion.h4
                                            className="text-sm text-[var(--pallet-5)]"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.6 }}
                                        >
                                            Kepada Yth.
                                        </motion.h4>
                                        <motion.h3
                                            className="alice-regular text-lg text-[var(--pallet-5)]"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.8 }}
                                        >
                                            {guest?.name || 'Bapak/Ibu/Saudara/i'}
                                        </motion.h3>
                                    </div>
                                    <motion.p
                                        className="text-xs font-bold text-[var(--pallet-5)] italic"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 1 }}
                                    >
                                        *Mohon maaf jika ada kesalahan dalam penulisan nama / gelar.
                                    </motion.p>
                                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 1.2 }}>
                                        <Button size="lg" variant="pallet_5" onClick={() => setOpened(true)}>
                                            <Mail />
                                            Buka Undangan
                                        </Button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ) : (
                            /* ================= KONTEN SESUDAH DIBUKA ================= */
                            <motion.div
                                key="opened"
                                ref={scrollContainerRef}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                className="scrollbar-hide bg-pallet-2 absolute inset-0 overflow-y-auto"
                            >
                                {/* HOME SECTION */}
                                <section id="home" className="bg-pallet-1 relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 text-center">
                                    <motion.div
                                        className="mb-6 h-88 w-68 rounded-t-full"
                                        style={{ backgroundImage: `url(${Ornament1})` }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        <div className="bg-pallet-5-opacity flex h-88 w-68 items-center justify-center rounded-t-full">
                                            <img src={childPhoto} alt={`Foto ${invitation?.child_name}`} className="z-10 h-80 w-60 rounded-t-full object-cover object-top" />
                                        </div>
                                    </motion.div>

                                    <motion.h2
                                        className="alice-regular mb-6 text-lg tracking-widest text-[var(--pallet-5)]"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        ACARA KHITAN
                                    </motion.h2>

                                    <motion.h1
                                        className="great-vibes-regular mb-6 text-5xl leading-14 text-[var(--pallet-5)]"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                    >
                                        {invitation?.child_name || 'Nama Anak'}
                                    </motion.h1>

                                    <motion.hr
                                        className="mb-6 w-60 border-t border-[var(--pallet-5)]"
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        transition={{ duration: 0.6, delay: 1.4 }}
                                    />

                                    <div id="time" className="z-10 space-y-6">
                                        <motion.h3
                                            className="alice-regular text-lg text-[var(--pallet-5)]"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.8 }}
                                        >
                                            {formatDate(invitation?.event_date ?? '2030-01-01')}
                                        </motion.h3>

                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center justify-center gap-2 rounded-xl bg-[radial-gradient(ellipse_at_center,var(--pallet-4)_0%,var(--pallet-5)_70%)] p-2">
                                                <div className="bg-pallet-1 flex h-14 w-14 flex-col items-center justify-center -space-y-1 rounded-lg">
                                                    <h4 className="alice-regular text-3xl font-bold text-[var(--pallet-5)]">{countdown.days}</h4>
                                                    <p className="text-xs text-[var(--pallet-5)]">hari</p>
                                                </div>
                                                <div className="bg-pallet-1 flex h-14 w-14 flex-col items-center justify-center -space-y-1 rounded-lg">
                                                    <h4 className="alice-regular text-3xl font-bold text-[var(--pallet-5)]">{countdown.hours}</h4>
                                                    <p className="text-xs text-[var(--pallet-5)]">jam</p>
                                                </div>
                                                <div className="bg-pallet-1 flex h-14 w-14 flex-col items-center justify-center -space-y-1 rounded-lg">
                                                    <h4 className="alice-regular text-3xl font-bold text-[var(--pallet-5)]">{countdown.minutes}</h4>
                                                    <p className="text-xs text-[var(--pallet-5)]">menit</p>
                                                </div>
                                                <div className="bg-pallet-1 flex h-14 w-14 flex-col items-center justify-center -space-y-1 rounded-lg">
                                                    <h4 className="alice-regular text-3xl font-bold text-[var(--pallet-5)]">{countdown.seconds}</h4>
                                                    <p className="text-xs text-[var(--pallet-5)]">detik</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* PEMBUKA SECTION */}
                                <section id="open" className="relative bg-[radial-gradient(ellipse_at_center,var(--pallet-4)_0%,var(--pallet-5)_70%)] p-6">
                                    <div className="flex flex-col items-center space-y-6 px-4 py-16 text-center">
                                        <motion.h3
                                            className="alice-regular text-lg text-[var(--pallet-1)]"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.1 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                        >
                                            Assalamu'alaikum <br /> warahmatullahi wabarakatuh
                                        </motion.h3>

                                        <motion.p
                                            className="text-sm text-[var(--pallet-1)]"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                        >
                                            Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara khitan putra kami.
                                        </motion.p>

                                        <motion.div
                                            className="space-y-1"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.3 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                        >
                                            <h4 className="text-sm text-[var(--pallet-1)]">Nama putra</h4>
                                            <h3 className="alice-regular text-lg text-[var(--pallet-1)]">{invitation?.child_name || 'Nama Anak'}</h3>
                                        </motion.div>

                                        <motion.hr
                                            className="mb-4 w-60 border-t border-[var(--pallet-1)]"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ duration: 0.6, delay: 0.4 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                        />

                                        <motion.div
                                            className="space-y-1"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.5 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                        >
                                            <h4 className="text-sm text-[var(--pallet-1)]">Putra dari</h4>
                                            <h3 className="alice-regular text-lg text-[var(--pallet-1)]">{invitation?.father_name || 'Nama Ayah'}</h3>
                                            <h4 className="text-sm text-[var(--pallet-1)]">dan</h4>
                                            <h3 className="alice-regular text-lg text-[var(--pallet-1)]">{invitation?.mother_name || 'Nama Ibu'}</h3>
                                        </motion.div>

                                        <motion.p
                                            className="text-sm text-[var(--pallet-1)]"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.6 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                        >
                                            Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa dan restu bagi putra kami.
                                        </motion.p>

                                        <motion.p
                                            className="text-sm text-[var(--pallet-1)]"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.7 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                        >
                                            Atas kehadiran dan doanya, kami ucapkan terima kasih.
                                        </motion.p>

                                        <motion.h3
                                            className="alice-regular text-lg text-[var(--pallet-1)]"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.8 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                        >
                                            Wassalamu'alaikum warahmatullahi wabarakatuh
                                        </motion.h3>
                                    </div>

                                    {/* Decorative elements */}
                                    <div className="pointer-events-none absolute inset-0 z-10">
                                        <img className="absolute top-2 left-2 h-25 w-25 opacity-60" src={Element5} />
                                        <img className="absolute top-2 right-2 h-25 w-25 scale-x-[-1] opacity-60" src={Element5} />
                                        <img className="absolute bottom-2 left-2 h-25 w-25 scale-y-[-1] opacity-60" src={Element5} />
                                        <img className="absolute right-2 bottom-2 h-25 w-25 scale-x-[-1] scale-y-[-1] opacity-60" src={Element5} />
                                    </div>

                                    <div className="pointer-events-none absolute inset-0 z-20">
                                        <div className="absolute top-6 left-1/2 h-px w-[calc(100%-65%)] -translate-x-1/2 bg-[var(--pallet-1)] opacity-40 md:w-[calc(100%-35%)] lg:w-[calc(100%-60%)]" />
                                        <div className="absolute bottom-6 left-1/2 h-px w-[calc(100%-65%)] -translate-x-1/2 bg-[var(--pallet-1)] opacity-40 md:w-[calc(100%-35%)] lg:w-[calc(100%-60%)]" />
                                        <div className="absolute top-1/2 left-6 h-[calc(100%-30%)] w-px -translate-y-1/2 bg-[var(--pallet-1)] opacity-40 md:h-[calc(100%-40%)] lg:h-[calc(100%-35%)]" />
                                        <div className="absolute top-1/2 right-6 h-[calc(100%-30%)] w-px -translate-y-1/2 bg-[var(--pallet-1)] opacity-40 md:h-[calc(100%-40%)] lg:h-[calc(100%-35%)]" />
                                    </div>

                                    <div className="pointer-events-none absolute inset-0 z-30">
                                        <img className="absolute top-1/2 left-3 w-6 -translate-y-1/2 opacity-60" src={Element2} />
                                        <img className="absolute top-1/2 right-3 w-6 -translate-y-1/2 opacity-60" src={Element2} />
                                        <img className="absolute -top-0.5 left-1/2 w-6 -translate-x-1/2 rotate-90 opacity-60" src={Element2} />
                                        <img className="absolute -bottom-0.5 left-1/2 w-6 -translate-x-1/2 -rotate-90 opacity-60" src={Element2} />
                                    </div>
                                </section>

                                {/* LOKASI SECTION */}
                                <section id="location" className="bg-pallet-1 relative flex items-center justify-center px-4 py-16">
                                    <div className="flex max-w-xl flex-col items-center space-y-6 rounded-xl bg-[radial-gradient(ellipse_at_center,var(--pallet-4)_0%,var(--pallet-5)_70%)] p-4 text-center">
                                        <motion.h2
                                            className="alice-regular text-lg tracking-widest text-[var(--pallet-1)]"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                        >
                                            LOKASI ACARA
                                        </motion.h2>

                                        <motion.p
                                            className="alice-regular text-sm text-[var(--pallet-1)]"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.1 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                        >
                                            {invitation?.event_location || 'Lokasi Acara'}
                                        </motion.p>

                                        {invitation?.event_location_url && (
                                            <motion.div
                                                className="w-full"
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                                viewport={{ once: true, margin: '-100px' }}
                                            >
                                                <Button size="lg" variant="pallet_1" className="w-full" asChild>
                                                    <a href={invitation.event_location_url} target="_blank" rel="noopener noreferrer">
                                                        <MapPinned />
                                                        Buka Maps
                                                    </a>
                                                </Button>
                                            </motion.div>
                                        )}
                                    </div>
                                </section>

                                {/* HADIAH SECTION */}
                                <section
                                    id="gift"
                                    className="relative flex items-center justify-center bg-[radial-gradient(ellipse_at_center,var(--pallet-4)_0%,var(--pallet-5)_70%)] px-4 py-16"
                                >
                                    <div className="max-w-xl rounded-t-full" style={{ backgroundImage: `url(${Ornament1})` }}>
                                        <div className="bg-pallet-5-opacity rounded-t-full p-4">
                                            <div className="bg-pallet-1 flex flex-col items-center space-y-6 rounded-t-full border border-[var(--pallet-5)] p-4 text-center">
                                                <motion.h2
                                                    className="alice-regular mt-10 text-lg tracking-widest text-[var(--pallet-5)]"
                                                    initial={{ opacity: 0, y: 30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.6 }}
                                                    viewport={{ once: true, margin: '-100px' }}
                                                >
                                                    HADIAH
                                                </motion.h2>

                                                <div className="px-2 md:px-20 lg:px-4">
                                                    <motion.p
                                                        className="alice-regular text-sm text-[var(--pallet-5)]"
                                                        initial={{ opacity: 0, y: 30 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.6, delay: 0.1 }}
                                                        viewport={{ once: true, margin: '-100px' }}
                                                    >
                                                        Terima kasih telah hadir dan berbagi kebahagiaan di acara khitan anak kami. Kehadiran dan doa serta perhatian Anda menjadi
                                                        hadiah yang sangat berarti bagi kami.
                                                    </motion.p>
                                                </div>

                                                {gifts.map((gift, index) => (
                                                    <motion.div
                                                        key={gift.id}
                                                        className="flex cursor-pointer flex-col items-center transition active:scale-95"
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(gift.account_number);
                                                            // Optional: tambah toast notification
                                                        }}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                                        viewport={{ once: true, margin: '-100px' }}
                                                    >
                                                        {gift.bank_logo ? (
                                                            <img src={`/storage/${gift.bank_logo}`} alt={gift.bank_name} className="mb-2 h-12 w-auto" />
                                                        ) : (
                                                            <h1 className="alice-regular text-2xl text-[var(--pallet-5)]">{gift.bank_name}</h1>
                                                        )}
                                                        <div className="-space-y-1">
                                                            <h3 className="alice-regular text-xl text-[var(--pallet-5)]">{gift.account_number}</h3>
                                                            <p className="text-sm text-[var(--pallet-5)]">A/N {gift.account_name}</p>
                                                        </div>
                                                    </motion.div>
                                                ))}

                                                {gifts.length === 0 && <p className="text-sm text-[var(--pallet-5)]">Belum ada informasi rekening</p>}

                                                {invitation?.whatsapp_number && (
                                                    <motion.div
                                                        className="w-full"
                                                        initial={{ opacity: 0, y: 30 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.6, delay: 0.2 }}
                                                        viewport={{ once: true, margin: '-100px' }}
                                                    >
                                                        <Button size="lg" variant="pallet_5" className="w-full" asChild>
                                                            <a href={`https://wa.me/${invitation.whatsapp_number}`} target="_blank" rel="noopener noreferrer">
                                                                <GiftIcon />
                                                                Konfirmasi Hadiah
                                                            </a>
                                                        </Button>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* UCAPAN SECTION */}
                                <section id="wishes" className="bg-pallet-1 relative flex items-center justify-center px-4 py-16">
                                    <div className="flex max-w-xl flex-col items-center space-y-6 rounded-xl bg-[radial-gradient(ellipse_at_center,var(--pallet-4)_0%,var(--pallet-5)_70%)] p-4 text-center">
                                        <motion.h2
                                            className="alice-regular text-lg tracking-widest text-[var(--pallet-1)]"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                        >
                                            UCAPAN
                                        </motion.h2>

                                        <motion.div
                                            className="w-full space-y-4"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.1 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                        >
                                            <Form {...WishController.store.form({})} options={{ preserveScroll: true }} className="space-y-6">
                                                {({ processing, errors }) => (
                                                    <>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="name" className="alice-regular block text-left text-[var(--pallet-1)]">
                                                                Nama
                                                            </Label>
                                                            <InputHome name="name" id="name" type="text" placeholder="Nama" defaultValue={guest?.name || ''} required />
                                                            <InputError message={errors.name} />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="message" className="alice-regular block text-left text-[var(--pallet-1)]">
                                                                Ucapan
                                                            </Label>
                                                            <TextareaHome name="message" id="message" placeholder="Tulis ucapan anda..." required />
                                                            <InputError message={errors.message} />
                                                        </div>

                                                        <Button size="lg" variant="pallet_1" className="w-full" disabled={processing}>
                                                            <Send />
                                                            Kirim
                                                        </Button>
                                                    </>
                                                )}
                                            </Form>
                                        </motion.div>

                                        <motion.div
                                            className="scrollbar-hide max-h-[450px] w-full space-y-4 overflow-y-auto"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                        >
                                            {wishes.map((wish) => (
                                                <div key={wish.id} className="bg-pallet-1 flex gap-4 rounded-xl p-4">
                                                    <div className="bg-pallet-5 flex aspect-square h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                                                        <h2 className="alice-regular text-lg text-[var(--pallet-1)]">{wish.name.charAt(0).toUpperCase()}</h2>
                                                    </div>
                                                    <div className="space-y-1 text-left">
                                                        <h3 className="alice-regular text-sm text-[var(--pallet-5)]">{wish.name}</h3>
                                                        <p className="text-sm text-[var(--pallet-5)]">{wish.message}</p>
                                                        <p className="alice-regular text-xs text-[var(--pallet-5)]">{getRelativeTime(wish.created_at)}</p>
                                                    </div>
                                                </div>
                                            ))}

                                            {wishes.length === 0 && <p className="text-sm text-[var(--pallet-1)]">Belum ada ucapan</p>}
                                        </motion.div>
                                    </div>
                                </section>

                                <footer className="bg-pallet-2 w-full px-4 pt-16 pb-4 text-center">
                                    <h3 className="alice-regular text-sm text-[var(--pallet-5)]">Crafted with love by Dateng Aja 🤍</h3>
                                </footer>

                                <ToggleMusic isPlaying={isPlaying} onToggleMusic={toggleMusic} scrollContainerRef={scrollContainerRef} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </HomeLayout>
    );
}
