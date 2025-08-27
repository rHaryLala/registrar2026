import { Link, usePage } from '@inertiajs/react';
import { Home, BookOpen, GraduationCap, Calendar, FileText, Settings, User, Mail, Bell, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sidebar } from '@/components/ui/sidebar';
import { User as UserType } from '@/types';
import { router } from '@inertiajs/react';

interface NavItem {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
}

const mainNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: '/student/dashboard',
        icon: Home,
    },
    {
        title: 'Mon Profil',
        href: '/student/profile',
        icon: User,
    },
    {
        title: 'Mes Cours',
        href: '/student/courses',
        icon: BookOpen,
        badge: '3',
    },
    {
        title: 'Emploi du temps',
        href: '/student/schedule',
        icon: Calendar,
    },
    {
        title: 'Mes Notes',
        href: '/student/grades',
        icon: FileText,
    },
    {
        title: 'Inscriptions',
        href: '/student/enrollments',
        icon: GraduationCap,
    },
];

const secondaryNavItems: NavItem[] = [
    {
        title: 'Notifications',
        href: '/student/notifications',
        icon: Bell,
        badge: '5',
    },
    {
        title: 'Messagerie',
        href: '/student/messages',
        icon: Mail,
        badge: '2',
    },
    {
        title: 'Paramètres',
        href: '/student/settings',
        icon: Settings,
    },
];

interface StudentSidebarProps {
    className?: string;
}

export function StudentSidebar({ className }: StudentSidebarProps) {
    const { url } = usePage();
    const { auth } = usePage().props as { auth: { user: UserType } };
    const user = auth.user;

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const isActive = (path: string) => {
        return url.startsWith(path);
    };

    const renderNavItem = (item: NavItem) => (
        <li key={item.href}>
            <Link
                href={item.href}
                className={cn(
                    'flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors',
                    isActive(item.href)
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:bg-gray-100',
                    'group'
                )}
            >
                <item.icon className={cn('w-5 h-5 mr-3', isActive(item.href) ? 'text-primary' : 'text-gray-500')} />
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                        {item.badge}
                    </span>
                )}
            </Link>
        </li>
    );

    return (
        <aside className={cn('flex flex-col w-64 h-screen bg-white border-r border-gray-200', className)}>
            {/* Logo */}
            <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
                <Link href="/student/dashboard" className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-primary">Student Portal</span>
                </Link>
            </div>

            {/* User Profile */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={user.profile_photo_path || ''} alt={user.name} />
                        <AvatarFallback>
                            {user.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <ul className="space-y-1">
                    {mainNavItems.map(renderNavItem)}
                </ul>
                
                <div className="px-4 py-2 mt-6">
                    <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Communication</h3>
                </div>
                
                <ul className="space-y-1">
                    {secondaryNavItems.map(renderNavItem)}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                </Button>
            </div>
        </aside>
    );
}
