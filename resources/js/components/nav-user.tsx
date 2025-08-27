import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData, type User } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronsUpDown, User as UserIcon } from 'lucide-react';
import ErrorBoundary from './error-boundary';

function NavUserContent() {
    const { auth } = usePage<SharedData>().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();
    const user = auth?.user as User | undefined;

    if (!user) {
        // Si l'utilisateur n'est pas connecté, afficher un bouton de connexion
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <a
                        href={route('login')}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                        <UserIcon className="h-4 w-4" />
                        <span>Se connecter</span>
                    </a>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent">
                            <UserInfo user={user} />
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="end"
                        side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}
                    >
                        <ErrorBoundary 
                            fallback={
                                <div className="p-3 text-sm text-red-600">
                                    Impossible de charger le menu utilisateur
                                </div>
                            }
                        >
                            <UserMenuContent user={user} />
                        </ErrorBoundary>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

export function NavUser() {
    return (
        <ErrorBoundary 
            fallback={
                <div className="px-3 py-2 text-sm text-red-600">
                    Erreur dans le composant utilisateur
                </div>
            }
        >
            <NavUserContent />
        </ErrorBoundary>
    );
}
