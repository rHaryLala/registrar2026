<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Student;
use Illuminate\Support\Str;

class ImportStudentsFromSql extends Command
{
    protected $signature = 'import:students:sql {file : Chemin vers le fichier SQL} {--force : Forcer l\'importation même si des données existent}';
    protected $description = 'Importe les étudiants depuis un fichier SQL local';

    public function handle()
    {
        $file = $this->argument('file');
        
        if (!file_exists($file)) {
            $this->error("Le fichier {$file} n'existe pas.");
            return 1;
        }

        if (!$this->option('force') && Student::count() > 0) {
            $this->error('La table des étudiants n\'est pas vide. Utilisez --force pour forcer l\'importation.');
            return 1;
        }

        $this->info('Début de l\'importation des étudiants depuis le fichier SQL...');
        
        // Désactiver temporairement les contraintes de clé étrangère
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        
        if ($this->option('force')) {
            Student::truncate();
        }

        // Lire le contenu du fichier SQL
        $sql = file_get_contents($file);
        
        // Extraire les données d'insertion
        preg_match_all("/\s*\(([^)]+)\)\s*[,;]/", $sql, $matches);
        
        if (empty($matches[1])) {
            $this->error('Aucune donnée trouvée dans le fichier SQL.');
            return 1;
        }

        $bar = $this->output->createProgressBar(count($matches[1]));
        $bar->start();

        foreach ($matches[1] as $row) {
            try {
                // Nettoyer et parser les données
                $row = str_replace(["'", "`"], '', $row);
                $data = array_map('trim', explode(",", $row));
                
                // Vérifier si l'utilisateur existe déjà ou en créer un nouveau
                $user = User::firstOrCreate(
                    ['email' => $data[7] ?? null],
                    [
                        'name' => trim($data[2] . ' ' . $data[3]),
                        'password' => bcrypt($data[8] ?? 'password'),
                        'email_verified_at' => now(),
                    ]
                );

                // Extraire l'année d'étude de l'année scolaire (ex: '2024 - 2025' -> '3' pour L3)
                $anneeEtude = '1'; // Par défaut
                if (!empty($data[57])) {
                    // Essayer d'extraire l'année de l'année scolaire (première année)
                    if (preg_match('/(\d{4})/', $data[57], $matches)) {
                        $anneeScolaire = (int)$matches[1];
                        $anneeActuelle = (int)date('Y');
                        $difference = $anneeActuelle - $anneeScolaire + 1;
                        $anneeEtude = (string)max(1, min(5, $difference)); // Entre 1 et 5
                    }
                }
                
                // Déterminer la mention envisagée à partir de l'option d'étude
                $mentionEnvisagee = 'Informatique'; // Par défaut
                if (!empty($data[35])) {
                    $mention = strtolower(trim($data[35]));
                    if (str_contains($mention, 'gestion')) {
                        $mentionEnvisagee = 'Gestion';
                    } elseif (str_contains($mention, 'infirmier') || str_contains($mention, 'santé')) {
                        $mentionEnvisagee = 'Science Infirmières';
                    } elseif (str_contains($mention, 'théologie')) {
                        $mentionEnvisagee = 'Théologie';
                    } elseif (str_contains($mention, 'communication')) {
                        $mentionEnvisagee = 'Communication';
                    } elseif (str_contains($mention, 'éducation') || str_contains($mention, 'education')) {
                        $mentionEnvisagee = 'Éducation';
                    }
                }

                // Valider et formater la date de naissance
                $dateNaissance = null;
                $rawDate = $data[9] ?? null;
                
                if (!empty($rawDate) && 
                    $rawDate !== '0000-00-00' && 
                    !str_starts_with($rawDate, '-') &&
                    !preg_match('/[a-zA-Z]/', $rawDate) && // Vérifie qu'il n'y a pas de lettres
                    preg_match('/^\d{4}-\d{2}-\d{2}/', $rawDate) // Vérifie le format YYYY-MM-DD
                ) {
                    try {
                        $date = \DateTime::createFromFormat('Y-m-d', substr($rawDate, 0, 10));
                        if ($date && $date->format('Y-m-d') === substr($rawDate, 0, 10)) {
                            $dateNaissance = $date->format('Y-m-d');
                        }
                    } catch (\Exception $e) {
                        $dateNaissance = null;
                    }
                }

                // Préparer les données de l'étudiant
                $studentData = [
                    'user_id' => $user->id,
                    'matricule' => $data[1] ?? null,
                    'nom' => $data[2] ?? null,
                    'prenom' => $data[3] ?? null,
                    'sexe' => $this->mapGender($data[6] ?? null),
                    'date_naissance' => $dateNaissance,
                    'lieu_naissance' => $data[10] ?? 'Non spécifié',
                    'nationalite' => $data[22] ?? 'Malagasy',
                    'etat_civil' => $this->mapCivilStatus($data[13] ?? null),
                    'nom_conjoint' => $data[14] ?? null,
                    'nb_enfant' => (int)($data[15] ?? 0),
                    'bacc_serie' => $data[56] ?? null,
                    'status' => $this->mapStatus($data[40] ?? null),
                    'appartement' => $data[42] ?? null,
                    'situation_familiale' => $data[43] ?? null,
                    'annee_scolaire' => $data[57] ?? null,
                    'periode' => $data[58] ?? null,
                    'annee_etude' => $anneeEtude, // Champ obligatoire
                    'mention_envisagee' => $mentionEnvisagee, // Champ obligatoire
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                // Créer l'étudiant
                Student::create($studentData);
                
            } catch (\Exception $e) {
                $this->error("Erreur lors de l'importation : " . $e->getMessage());
            }
            
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        
        // Réactiver les contraintes de clé étrangère
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
        
        $this->info('Importation terminée avec succès !');
        return 0;
    }
    
    private function mapGender($gender)
    {
        if (empty($gender)) return 'M'; // Par défaut
        
        $gender = strtolower(trim($gender));
        
        if (in_array($gender, ['1', 'm', 'masculin', 'homme', 'male'])) {
            return 'M';
        }
        
        if (in_array($gender, ['0', 'f', 'féminin', 'femme', 'female'])) {
            return 'F';
        }
        
        return 'M'; // Par défaut
    }
    
    private function mapCivilStatus($status)
    {
        if (empty($status)) return 'célibataire';
        
        $status = strtolower(trim($status));
        
        if (str_contains($status, 'mari')) {
            return 'marié';
        }
        
        return 'célibataire'; // Par défaut
    }
    
    private function mapStatus($status)
    {
        if (empty($status)) return 'actif';
        
        $status = strtolower(trim($status));
        
        if (in_array($status, ['interne', 'oui', 'actif', 'active'])) {
            return 'actif';
        }
        
        if (in_array($status, ['externe', 'non', 'inactif', 'inactive'])) {
            return 'inactif';
        }
        
        return 'actif'; // Par défaut
    }
}
