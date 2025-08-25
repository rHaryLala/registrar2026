<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            
            // Clé étrangère vers la table users
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            
            // Informations personnelles
            $table->string('matricule')->unique()->nullable();
            $table->string('nom');
            $table->string('prenom');
            $table->enum('sexe', ['M', 'F']);
            $table->date('date_naissance')->nullable();
            $table->string('lieu_naissance')->nullable();
            $table->string('nationalite');
            $table->string('religion')->nullable();
            $table->string('photo')->nullable();

            // Note: Les champs CIN et coordonnées ont été déplacés vers des tables dédiées (cins et contacts)

            // Scolarité
            $table->string('annee_etude');
            $table->enum('status', ['actif', 'inactif', 'diplômé', 'abandon']);
            $table->string('bacc_serie')->nullable();
            $table->date('bacc_date_obtention')->nullable();
            $table->string('annee_scolaire')->nullable();
            $table->string('periode')->nullable();
            $table->string('appartement')->nullable();
            $table->string('situation_familiale')->nullable();
            $table->boolean('bursary_status')->default(false);
            $table->boolean('new_student')->default(false);
            $table->boolean('graduated')->default(false);
            $table->date('graduation_date')->nullable();

            // Sponsor
            $table->string('sponsor_nom')->nullable();
            $table->string('sponsor_prenom')->nullable();
            $table->string('sponsor_telephone')->nullable();
            $table->text('sponsor_adresse')->nullable();

            // Mention
            $table->string('mention_envisagee');

            // Administration
            $table->boolean('remove')->default(false);
            $table->date('date_entry')->nullable();
            $table->unsignedBigInteger('last_change_user_id')->nullable();
            $table->timestamp('last_change_datetime')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('students');
    }
}