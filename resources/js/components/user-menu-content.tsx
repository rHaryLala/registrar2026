import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';

interface UserMenuContentProps {
    user: User | null | undefined;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        cleanup();
        router.post('/logout');
    };

    if (!user) {
        return (
            <div className="p-4 text-sm">
                <p>Non connecté</p>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem asChild>
                    <Link 
                        href={route('login')}
                        className="flex w-full items-center px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                        Se connecter
                    </Link>
                </DropdownMenuItem>
            </div>
        );
    }

    return (
        <div className="w-full">
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-3 py-2 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link 
                        href="/settings/profile" 
                        className="flex w-full items-center px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                        onClick={cleanup}
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem asChild>
                <form method="POST" action="/logout" onSubmit={handleLogout} className="w-full">
                    <input type="hidden" name="_token" value={window.csrf_token} />
                    <button 
                        type="submit"
                        className="flex w-full items-center px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Se déconnecter</span>
                    </button>
                </form>
            </DropdownMenuItem>
        </div>
    );
}
