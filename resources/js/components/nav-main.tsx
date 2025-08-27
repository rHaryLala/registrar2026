import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarMenuSub, 
  SidebarMenuSubButton,
  useSidebar
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const { isMobile } = useSidebar();
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

    const toggleSubmenu = (title: string) => {
        setOpenSubmenus(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <div key={item.title}>
                        {item.items ? (
                            <SidebarMenuItem>
                                <SidebarMenuSub>
                                    <SidebarMenuButton 
                                        asChild
                                        onClick={() => toggleSubmenu(item.title)}
                                        className="flex items-center justify-between w-full"
                                    >
                                        <div>
                                            <div className="flex items-center gap-2">
                                                {item.icon && <item.icon className="h-4 w-4" />}
                                                <span>{item.title}</span>
                                            </div>
                                            {openSubmenus[item.title] ? (
                                                <ChevronDown className="h-4 w-4" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4" />
                                            )}
                                        </div>
                                    </SidebarMenuButton>
                                    {openSubmenus[item.title] && (
                                        <div className="pl-6">
                                            {item.items.map((subItem) => (
                                                <SidebarMenuButton 
                                                    key={subItem.title}
                                                    asChild 
                                                    isActive={page.url.startsWith(subItem.href || '')}
                                                    className="pl-2"
                                                >
                                                    <Link href={subItem.href || '#'} prefetch>
                                                        {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            ))}
                                        </div>
                                    )}
                                </SidebarMenuSub>
                            </SidebarMenuItem>
                        ) : (
                            <SidebarMenuItem>
                                <SidebarMenuButton 
                                    asChild 
                                    isActive={page.url === item.href}
                                >
                                    <Link href={item.href || '#'} prefetch>
                                        {item.icon && <item.icon className="h-4 w-4" />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                    </div>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
