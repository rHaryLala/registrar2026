<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->string('numero')->unique();
            $table->date('date_delivrance');
            $table->string('lieu_delivrance');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cins');
    }
};
