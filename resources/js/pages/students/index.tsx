import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

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

const initialForm = {
    // Étape 1
    nom: '',
    prenom: '',
    sexe: '',
    date_naissance: '',
    lieu_naissance: '',
    adresse: '',
    region: '',
    // Étape 2
    email: '',
    password: '',
    telephone: '',
    religion: '',
    etat_civil: '',
    nom_conjoint: '',
    nb_enfant: 0,
    nationalite: '',
    photo: '',
    // Étape 3
    status: '',
    appartement: '',
    situation_familiale: '',
    annee_etude: '',
    graduated: false,
    graduation_date: '',
    bursary_status: false,
    new_student: false,
    bacc_serie: '',
    annee_scolaire: '',
    periode: '',
    // Étape 4
    remove: false,
    date_entry: '',
    last_change_user_id: '',
    last_change_datetime: '',
};

export default function StudentsIndex({ students }: StudentsPageProps) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [step, setStep] = useState(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value, type } = target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value,
        });
    };

    const handleNext = () => setStep((s) => Math.min(s + 1, 4));
    const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Envoyer les données au backend
        Inertia.post('/students', form, {
            onSuccess: () => {
                setOpen(false);
                setStep(1);
                setForm(initialForm);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Étudiants" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-muted-foreground">
                            Gérez les étudiants de votre établissement
                        </p>
                    </div>
                    <Button onClick={() => setOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvel étudiant
                    </Button>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Rechercher un étudiant..." className="pl-8" />
                    </div>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filtres
                    </Button>
                </div>
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
                                    <Button className="mt-4" onClick={() => setOpen(true)}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Ajouter un étudiant
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
            {/* Modal multi-étapes */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un étudiant</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {step === 1 && (
                            <>
                                <Input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
                                <Input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
                                <select name="sexe" value={form.sexe} onChange={handleChange} required className="w-full border rounded p-2">
                                    <option value="">Sexe</option>
                                    <option value="M">Masculin</option>
                                    <option value="F">Féminin</option>
                                </select>
                                <Input name="date_naissance" type="date" placeholder="Date de naissance" value={form.date_naissance} onChange={handleChange} required />
                                <Input name="lieu_naissance" placeholder="Lieu de naissance" value={form.lieu_naissance} onChange={handleChange} required />
                                <Input name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} required />
                                <Input name="region" placeholder="Région" value={form.region} onChange={handleChange} required />
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                                <Input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} required />
                                <Input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} required />
                                <Input name="religion" placeholder="Religion" value={form.religion} onChange={handleChange} />
                                <select name="etat_civil" value={form.etat_civil} onChange={handleChange} required className="w-full border rounded p-2">
                                    <option value="">État civil</option>
                                    <option value="célibataire">Célibataire</option>
                                    <option value="marié">Marié</option>
                                    <option value="divorcé">Divorcé</option>
                                    <option value="veuf">Veuf</option>
                                </select>
                                <Input name="nom_conjoint" placeholder="Nom du conjoint" value={form.nom_conjoint} onChange={handleChange} />
                                <Input name="nb_enfant" type="number" placeholder="Nombre d'enfants" value={form.nb_enfant} onChange={handleChange} min={0} />
                                <Input name="nationalite" placeholder="Nationalité" value={form.nationalite} onChange={handleChange} required />
                                <Input name="photo" type="text" placeholder="Photo (URL ou chemin)" value={form.photo} onChange={handleChange} />
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <Input name="status" placeholder="Status" value={form.status} onChange={handleChange} />
                                <Input name="appartement" placeholder="Appartement" value={form.appartement} onChange={handleChange} />
                                <Input name="situation_familiale" placeholder="Situation familiale" value={form.situation_familiale} onChange={handleChange} />
                                <Input name="annee_etude" placeholder="Année d'étude" value={form.annee_etude} onChange={handleChange} />
                                <label>
                                    <input type="checkbox" name="graduated" checked={form.graduated} onChange={handleChange} />
                                    Diplômé
                                </label>
                                <Input name="graduation_date" type="date" placeholder="Date de diplomation" value={form.graduation_date} onChange={handleChange} />
                                <label>
                                    <input type="checkbox" name="bursary_status" checked={form.bursary_status} onChange={handleChange} />
                                    Boursier
                                </label>
                                <label>
                                    <input type="checkbox" name="new_student" checked={form.new_student} onChange={handleChange} />
                                    Nouvel étudiant
                                </label>
                                <Input name="bacc_serie" placeholder="Série du bac" value={form.bacc_serie} onChange={handleChange} />
                                <Input name="annee_scolaire" placeholder="Année scolaire" value={form.annee_scolaire} onChange={handleChange} />
                                <Input name="periode" placeholder="Période" value={form.periode} onChange={handleChange} />
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <label>
                                    <input type="checkbox" name="remove" checked={form.remove} onChange={handleChange} />
                                    Retiré
                                </label>
                                <Input name="date_entry" type="date" placeholder="Date d'entrée" value={form.date_entry} onChange={handleChange} />
                                <Input name="last_change_user_id" type="number" placeholder="ID utilisateur modif." value={form.last_change_user_id} onChange={handleChange} />
                                <Input name="last_change_datetime" type="datetime-local" placeholder="Date modif." value={form.last_change_datetime} onChange={handleChange} />
                            </>
                        )}
                        <DialogFooter>
                            {step > 1 && (
                                <Button type="button" variant="outline" onClick={handlePrev}>
                                    Précédent
                                </Button>
                            )}
                            {step < 4 ? (
                                <Button type="button" onClick={handleNext}>
                                    Suivant
                                </Button>
                            ) : (
                                <Button type="submit">Enregistrer</Button>
                            )}
                            <Button variant="ghost" type="button" onClick={() => { setOpen(false); setStep(1); }}>
                                Annuler
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}