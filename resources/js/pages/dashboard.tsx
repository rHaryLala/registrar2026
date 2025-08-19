import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useCallback } from 'react';
import { usePage } from '@inertiajs/react';
import { Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
    },
];

interface DashboardProps {
    studentCount: number;
}

export default function Dashboard({ studentCount }: DashboardProps) {
    const handleCardClick = useCallback(() => {
        window.location.href = '/students';
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tableau de bord" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div
                        className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border flex items-center justify-center cursor-pointer group transition-all hover:shadow-lg hover:border-primary/60 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-950 dark:via-blue-900 dark:to-blue-950"
                        onClick={handleCardClick}
                        title="Voir la liste des étudiants"
                        tabIndex={0}
                        role="button"
                        onKeyPress={e => { if (e.key === 'Enter') handleCardClick(); }}
                    >
                        <div className="z-10 flex items-center justify-between w-full px-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                                        <Users className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="text-l font-bold text-muted-foreground uppercase tracking-wider">
                                        Étudiants inscrits
                                    </div>
                                </div>
                                <div className="text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                    {studentCount.toLocaleString("fr-FR")}
                                </div>
                            </div>
                        </div>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-blue-300/20 dark:stroke-blue-900/20 pointer-events-none" />
                        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/60 transition-all" />
                    </div>
                    {/* ...les autres cards... */}
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}