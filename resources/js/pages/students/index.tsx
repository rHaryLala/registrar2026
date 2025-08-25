// pages/students/index.tsx
import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StudentFormModal from '@/components/student-form';

const ITEMS_PER_PAGE = 10;

interface Student {
  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  annee_etude: string;
  mention_envisagee: string;
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

const LEVELS = ['L1', 'L2', 'L3', 'M1', 'M2'] as const;
const MENTIONS = [
  'Informatique',
  'Gestion',
  'Science Infirmières',
  'Théologie',
  'Communication',
  'Éducation'
] as const;

export default function StudentsIndex({ students: initialStudents }: StudentsPageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [mentionFilter, setMentionFilter] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Student; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Trier les étudiants
  const sortedStudents = useMemo(() => {
    let sortableItems = [...initialStudents];
    
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableItems;
  }, [initialStudents, sortConfig]);

  // Filtrer les étudiants
  const filteredStudents = useMemo(() => {
    return sortedStudents.filter(student => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        (student.matricule?.toLowerCase() || '').includes(searchLower) ||
        (student.nom?.toLowerCase() || '').includes(searchLower) ||
        (student.prenom?.toLowerCase() || '').includes(searchLower) ||
        (student.email?.toLowerCase() || '').includes(searchLower) ||
        (student.telephone?.includes(searchTerm) || false);

      const matchesStatus = statusFilter === 'all' || !statusFilter || student.status === statusFilter;
      const matchesYear = yearFilter === 'all' || !yearFilter || student.annee_etude === yearFilter;
      const matchesMention = mentionFilter === 'all' || !mentionFilter || student.mention_envisagee === mentionFilter;

      return matchesSearch && matchesStatus && matchesYear && matchesMention;
    });
  }, [sortedStudents, searchTerm, statusFilter, yearFilter, mentionFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const currentStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredStudents]);

  const handleSuccess = () => {
    setModalOpen(false);
  };

  const requestSort = (key: keyof Student) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const resetFilters = () => {
    setStatusFilter('all');
    setYearFilter('all');
    setMentionFilter('all');
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Étudiants" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Liste des étudiants</h1>
            <p className="text-muted-foreground">
              {filteredStudents.length} étudiant(s) trouvé(s)
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={resetFilters}
              disabled={!searchTerm && !statusFilter && !yearFilter && !mentionFilter && !sortConfig}
            >
              Réinitialiser les filtres
            </Button>
            <Button type="button" onClick={() => setModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvel étudiant
            </Button>
          </div>
        </div>
        
        {/* Recherche + filtres */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher par nom, prénom ou matricule..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <Button 
                type="button" 
                variant={showFilters ? 'default' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
                className="flex-shrink-0"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtres {[statusFilter, yearFilter, mentionFilter].filter(Boolean).length > 0 ? 
                  `(${[statusFilter, yearFilter, mentionFilter].filter(Boolean).length})` : ''}
              </Button>
            </div>
          </CardHeader>
          
          {/* Filtres avancés */}
          {showFilters && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium mb-1 block">Niveau d'étude</label>
                  <Select 
                    value={yearFilter} 
                    onValueChange={(value) => {
                      setYearFilter(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les niveaux" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les niveaux</SelectItem>
                      {LEVELS.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Mention</label>
                  <Select 
                    value={mentionFilter} 
                    onValueChange={(value) => {
                      setMentionFilter(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les mentions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les mentions</SelectItem>
                      {MENTIONS.map(mention => (
                        <SelectItem key={mention} value={mention}>{mention}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Statut</label>
                  <Select 
                    value={statusFilter} 
                    onValueChange={(value) => {
                      setStatusFilter(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="actif">Actif</SelectItem>
                      <SelectItem value="inactif">Inactif</SelectItem>
                      <SelectItem value="diplômé">Diplômé</SelectItem>
                      <SelectItem value="abandon">Abandon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          <CardContent>
            {/* Tableau des étudiants */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => requestSort('matricule')}
                    >
                      <div className="flex items-center">
                        Matricule
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => requestSort('nom')}
                    >
                      <div className="flex items-center">
                        Nom
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => requestSort('prenom')}
                    >
                      <div className="flex items-center">
                        Prénom
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Mention</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentStudents.length > 0 ? (
                    currentStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{student.matricule || '-'}</TableCell>
                        <TableCell>{student.nom}</TableCell>
                        <TableCell>{student.prenom}</TableCell>
                        <TableCell>{student.annee_etude || '-'}</TableCell>
                        <TableCell>{student.mention_envisagee || '-'}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            student.status === 'actif' ? 'bg-green-100 text-green-800' :
                            student.status === 'inactif' ? 'bg-yellow-100 text-yellow-800' :
                            student.status === 'diplômé' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {student.status || 'Inconnu'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Aucun étudiant trouvé avec les critères sélectionnés.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-2 mt-4">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} sur {totalPages} • {filteredStudents.length} étudiant(s) au total
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="px-4 text-sm">
                    Page {currentPage}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal d'ajout d'étudiant */}
        <StudentFormModal
          open={modalOpen}
          onOpenChange={() => setModalOpen(false)}
          onSuccess={handleSuccess}
        />
      </div>
    </AppLayout>
  );
}