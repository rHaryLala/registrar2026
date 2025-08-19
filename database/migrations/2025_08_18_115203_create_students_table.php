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
            $table->string('nom', 150);
            $table->string('prenom', 150);
            $table->string('sexe', 20);
            $table->date('date_naissance');
            $table->string('lieu_naissance', 150);
            $table->string('adresse', 200);
            $table->string('region', 255);
            $table->string('email', 200)->unique();
            $table->string('password', 200);
            $table->string('telephone', 150);
            $table->string('religion', 30);
            $table->string('nom_conjoint', 150)->nullable();
            $table->integer('nb_enfant')->default(0);
            $table->string('nationalite', 30);
            $table->string('photo', 255)->nullable();
            $table->string('status', 150);
            $table->string('appartement', 150);
            $table->string('situation_familiale', 150);
            $table->string('annee_etude', 40);
            $table->boolean('graduated');
            $table->date('graduation_date')->nullable();
            $table->boolean('bursary_status');
            $table->boolean('new_student');
            $table->string('bacc_serie', 10);
            $table->string('annee_scolaire', 200);
            $table->string('periode', 200);
            $table->boolean('remove')->default(false);
            $table->timestamp('date_entry')->useCurrent();
            $table->unsignedBigInteger('last_change_user_id');
            $table->timestamp('last_change_datetime')->nullable();
            $table->foreign('last_change_user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('students');
    }
}