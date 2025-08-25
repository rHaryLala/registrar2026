import React from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MentionsIndex() {
    return (
        <AdminLayout title="Mentions & Parcours">
            <Card>
                <CardHeader>
                    <CardTitle>Gestion des Mentions et Parcours</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p>Interface d'administration des mentions et parcours à venir...</p>
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
