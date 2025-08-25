<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesTable extends Migration
{
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id(); // 1: Admin, 2: Employé, 3: Enseignant, 4: Etudiant
            $table->string('name', 50)->unique();
            $table->timestamps();
        });

        // Insérer les rôles par défaut
        DB::table('roles')->insert([
            ['id' => 1, 'name' => 'Admin'],
            ['id' => 2, 'name' => 'Employé'],
            ['id' => 3, 'name' => 'Enseignant'],
            ['id' => 4, 'name' => 'Etudiant'],
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('roles');
    }
}