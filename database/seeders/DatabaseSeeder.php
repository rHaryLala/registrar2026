<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\GenerateMatriculesForExistingStudents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Ajouter l'utilisateur admin par défaut
        $this->call([
            AdminUserSeeder::class,
            GenerateMatriculesForExistingStudents::class,
        ]);
    }
}
