<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Vérifier si l'utilisateur admin existe déjà
        if (!User::where('email', 'rabenamana.h@zurcher.edu.mg')->exists()) {
            User::create([
                'name' => 'Rabenamana Hary Lala',
                'email' => 'rabenamana.h@zurcher.edu.mg',
                'password' => Hash::make('3453Student23'),
                'email_verified_at' => now(),
            ]);
            
            $this->command->info('Utilisateur admin créé avec succès!');
        } else {
            $this->command->info('L\'utilisateur admin existe déjà.');
        }
    }
}
