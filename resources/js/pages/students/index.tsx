// pages/students/index.tsx
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import StudentFormModal from '@/components/student-form';

interface Student {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  annee_etude: string;
  status: string;
  created_at: string;
}

interface StudentsPageProps extends PageProps {
  students: Student[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Étudiants',
    href: '/students',
  },
];

export default function StudentsIndex({ students }: StudentsPageProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSuccess = () => {
    // Optionnel: faire quelque chose après un ajout réussi
    console.log('Étudiant ajouté avec succès');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Étudiants" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">
              Gérez les étudiants de votre établissement
            </p>
          </div>
          <Button type="button" onClick={() => setModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel étudiant
          </Button>
        </div>
        
        {/* Recherche + filtres */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un étudiant..." className="pl-8" />
          </div>
          <Button type="button" variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
        </div>
        
        {/* Liste étudiants */}
        <div className="grid gap-4">
          {students && students.length > 0 ? (
            students.map((student) => (
              <Card key={student.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {student.prenom} {student.nom}
                      </CardTitle>
                      <CardDescription>
                        {student.email} • {student.telephone}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{student.annee_etude}</div>
                      <div className="text-sm text-muted-foreground">{student.status}</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Aucun étudiant trouvé</h3>
                  <p className="text-muted-foreground mt-2">
                    Commencez par ajouter votre premier étudiant.
                  </p>
                  <Button type="button" className="mt-4" onClick={() => setModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un étudiant
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Modal d'inscription */}
      <StudentFormModal 
        open={modalOpen} 
        onOpenChange={setModalOpen}
        onSuccess={handleSuccess}
      />
    </AppLayout>
  );
}