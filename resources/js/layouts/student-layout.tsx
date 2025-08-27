import React, { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import { StudentSidebar } from '@/components';

export default function StudentLayout({ children, title }: { children: ReactNode; title: string }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head title={title} />
            
            <div className="flex h-screen overflow-hidden">
                <StudentSidebar />
                
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="p-6">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                            {title}
                        </h1>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
