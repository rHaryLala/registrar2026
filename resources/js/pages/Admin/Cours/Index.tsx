import React from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CoursIndex() {
    return (
        <AdminLayout title="Gestion des Cours">
            <Card>
                <CardHeader>
                    <CardTitle>Gestion des Cours</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p>Interface d'administration des cours à venir...</p>
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
