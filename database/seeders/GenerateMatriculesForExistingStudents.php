<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Services\StudentMatriculeService;
use Illuminate\Database\Seeder;

class GenerateMatriculesForExistingStudents extends Seeder
{
    /**
     * Exécute le seeder.
     *
     * @return void
     */
    public function run()
    {
        $matriculeService = new StudentMatriculeService();
        
        // Récupérer les étudiants sans matricule
        $students = Student::whereNull('matricule')->get();
        
        foreach ($students as $student) {
            try {
                $student->matricule = $matriculeService->generate($student->mention_envisagee);
                $student->save();
                $this->command->info("Matricule généré pour l'étudiant {$student->id}: {$student->matricule}");
            } catch (\Exception $e) {
                $this->command->error("Erreur lors de la génération du matricule pour l'étudiant {$student->id}: " . $e->getMessage());
            }
        }
        
        $this->command->info('Génération des matricules terminée.');
    }
}
