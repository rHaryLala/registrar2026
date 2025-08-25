import React from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SessionsIndex() {
    return (
        <AdminLayout title="Gestion des Sessions">
            <Card>
                <CardHeader>
                    <CardTitle>Gestion des Sessions Académiques</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p>Interface d'administration des sessions académiques à venir...</p>
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
