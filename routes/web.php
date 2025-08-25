<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\EtatCivilController;
use App\Models\Student;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\Api\MatriculeController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $studentCount = Student::count();
        return Inertia::render('dashboard', [
            'studentCount' => $studentCount,
        ]);
    })->name('dashboard');
    
    //Route pour les étudiants
    Route::resource('students', StudentController::class);

    //Route pour les rôles
    Route::resource('roles', RoleController::class);

        // Routes pour les étudiants
    Route::post('/students', [StudentController::class, 'store'])->name('students.store');
    Route::get('/students/create', [StudentController::class, 'create'])->name('students.create');
    
    // Vérification des matricules
    Route::get('/api/check-matricule', [MatriculeController::class, 'checkMatricule'])->name('api.check-matricule');
    Route::get('/students/{student}/edit', [StudentController::class, 'edit'])->name('students.edit');
    Route::put('/students/{student}', [StudentController::class, 'update'])->name('students.update');
    Route::delete('/students/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
    
    // Routes pour la gestion de l'état civil des étudiants
    Route::resource('students.etat-civil', EtatCivilController::class)->except(['index', 'show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
