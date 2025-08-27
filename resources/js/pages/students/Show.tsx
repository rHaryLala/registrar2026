import { PageProps } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import StudentLayout from '@/layouts/student-layout';

interface EtatCivil {
    id?: number;
    student_id?: number;
    situation?: string;
    nom_conjoint?: string;
    nb_enfant?: number;
    created_at?: string;
    updated_at?: string;
}

interface User {
    id: number;
    profile_photo_path?: string;
}

interface StudentData {
    id: number;
    matricule?: string;
    nom: string;
    prenom: string;
    email?: string;
    sexe: string;
    date_naissance: string | null;
    lieu_naissance: string;
    nationalite: string;
    religion?: string;
    telephone: string;
    etat_civil: string;
    cin_numero?: string | null;
    adresse?: string;
    ville?: string;
    code_postal?: string;
    pays?: string;
    telephone_mobile?: string;
    email_personnel?: string;
    annee_etude?: string;
    status?: string;
    bacc_serie?: string | null;
    bacc_date_obtention?: string | null;
    mention_envisagee?: string;
    user?: {
        id: number;
        name: string;
        email: string;
        profile_photo_path: string | null;
        created_at: string;
        updated_at: string;
    } | null;
    etatCivil?: {
        id: number;
        student_id: number;
        situation: string;
        nom_conjoint: string | null;
        nb_enfant: number | null;
        created_at: string;
        updated_at: string;
    } | null;
    created_at?: string;
    updated_at?: string;
}

interface StudentProfileProps extends PageProps {
    student: StudentData | null;
}

import { useEffect } from 'react';

export default function Show({ student }: StudentProfileProps) {
    useEffect(() => {
        console.log('Student data:', student);
        if (student?.etatCivil) {
            console.log('etatCivil data:', student.etatCivil);
        }
    }, [student]);

    const getInitials = (name: string, surname: string) => {
        return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
    };

    if (!student) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Aucune donnée d'étudiant trouvée.</p>
            </div>
        );
    }

    return (
        <StudentLayout title="Mon Profil">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Mon Profil</h1>
                    <Badge variant="outline" className="text-sm">
                        Étudiant
                    </Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Profile Card */}
                    <Card className="md:col-span-1">
                        <CardHeader className="items-center">
                            <Avatar className="h-24 w-24 mb-4">
                                {student.user?.profile_photo_path ? (
                                    <AvatarImage 
                                        src={`/storage/${student.user.profile_photo_path}`} 
                                        alt={`${student.prenom} ${student.nom}`}
                                    />
                                ) : (
                                    <AvatarFallback>
                                        {getInitials(student.prenom, student.nom)}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <CardTitle className="text-center">
                                {student.prenom} {student.nom}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {student.email}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Téléphone</span>
                                    <span className="text-sm font-medium">{student.telephone}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Date de naissance</span>
                                    <span className="text-sm font-medium">
                                        {student.date_naissance ? format(new Date(student.date_naissance), 'dd/MM/yyyy') : 'Non spécifiée'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Lieu de naissance</span>
                                    <span className="text-sm font-medium">{student.lieu_naissance}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Nationalité</span>
                                    <span className="text-sm font-medium">{student.nationalite}</span>
                                </div>
                                {student.cin_numero && (
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">CIN</span>
                                        <span className="text-sm font-medium">{student.cin_numero}</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations de contact</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium text-muted-foreground">Adresse</h3>
                                        <p className="text-sm">
                                            {student.adresse || 'Non renseignée'}
                                        </p>
                                        <p className="text-sm">
                                            {student.code_postal} {student.ville}
                                        </p>
                                        <p className="text-sm">
                                            {student.pays}
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Téléphone mobile</h3>
                                            <p className="text-sm">
                                                {student.telephone_mobile || student.telephone}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Email personnel</h3>
                                            <p className="text-sm">
                                                {student.email_personnel || 'Non renseigné'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations complémentaires</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">État civil</h3>
                                            <p className="text-sm capitalize">
                                                {student.etatCivil?.situation || student.etat_civil || 'Non spécifié'}
                                            </p>
                                        </div>
                                        {student.etatCivil?.nom_conjoint && (
                                            <div>
                                                <h3 className="text-sm font-medium text-muted-foreground">Nom du conjoint</h3>
                                                <p className="text-sm">{student.etatCivil.nom_conjoint}</p>
                                            </div>
                                        )}
                                        {student.etatCivil?.nb_enfant !== undefined && student.etatCivil?.nb_enfant !== null && (
                                            <div>
                                                <h3 className="text-sm font-medium text-muted-foreground">Nombre d'enfants</h3>
                                                <p className="text-sm">{student.etatCivil.nb_enfant}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground">Sexe</h3>
                                            <p className="text-sm">
                                                {student.sexe === 'M' ? 'Masculin' : 'Féminin'}
                                            </p>
                                        </div>
                                        {(student.etatCivil?.created_at || student.etatCivil?.updated_at) && (
                                            <div>
                                                <h3 className="text-sm font-medium text-muted-foreground">Dernière mise à jour</h3>
                                                <p className="text-sm">
                                                    {format(
                                                        new Date(
                                                            student.etatCivil?.updated_at || 
                                                            student.etatCivil?.created_at || 
                                                            new Date().toISOString()
                                                        ), 
                                                        'dd/MM/yyyy HH:mm'
                                                    )}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
