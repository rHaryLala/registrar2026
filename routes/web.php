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

// Inscription étudiante publique
Route::get('/register/student', function () {
    return Inertia::render('auth/student-register');
})->middleware('guest')->name('register.student');

// Student routes (accessible by students and admins)
Route::middleware(['auth', 'verified'])->group(function () {
    // Helper function to get student data
    $getStudentData = function($student) {
        if (!$student) return null;
        
        // Charger les relations nécessaires
        $student->load([
            'etatCivil', 
            'user' => function($query) {
                $query->select('id', 'name', 'email', 'profile_photo_path', 'created_at', 'updated_at');
            }
        ]);
        
        // Récupérer les données de base de l'étudiant
        $studentData = $student->only([
            'id', 'matricule', 'nom', 'prenom', 'sexe', 'date_naissance', 'lieu_naissance',
            'nationalite', 'religion', 'telephone', 'etat_civil', 'cin_numero', 'adresse', 
            'ville', 'code_postal', 'pays', 'telephone_mobile', 'email_personnel',
            'annee_etude', 'status', 'bacc_serie', 'bacc_date_obtention', 'mention_envisagee',
            'created_at', 'updated_at'
        ]);
        
        // Ajouter l'email depuis la relation user si elle existe
        if ($student->relationLoaded('user') && $student->user) {
            $studentData['email'] = $student->user->email;
            $studentData['user'] = $student->user->only([
                'id', 'name', 'email', 'profile_photo_path', 'created_at', 'updated_at'
            ]);
        }
        
        // Ajouter les données d'état civil si elles existent
        if ($student->relationLoaded('etatCivil') && $student->etatCivil) {
            $studentData['etatCivil'] = $student->etatCivil->only([
                'id', 'student_id', 'situation', 'nom_conjoint', 'nb_enfant', 'created_at', 'updated_at'
            ]);
        }
        
        // Formater les dates
        if (isset($studentData['date_naissance'])) {
            $studentData['date_naissance'] = $studentData['date_naissance']->format('Y-m-d');
        }
        
        if (isset($studentData['bacc_date_obtention'])) {
            $studentData['bacc_date_obtention'] = $studentData['bacc_date_obtention']->format('Y-m-d');
        }
        
        return $studentData;
    };
    
    // Student dashboard
    Route::get('/student/dashboard', function () use ($getStudentData) {
        $student = auth()->user()->student;
        return Inertia::render('students/Show', [
            'student' => $getStudentData($student)
        ]);
    })->name('student.dashboard');
    
    // Student profile
    Route::get('/student/profile', function () use ($getStudentData) {
        $student = auth()->user()->student;
        return Inertia::render('students/Show', [
            'student' => $getStudentData($student)
        ]);
    })->name('student.profile');
});

// Admin routes are now in admin.php
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Admin dashboard
    Route::get('dashboard', function () {
        $students = Student::select([
            'id', 'matricule', 'nom', 'prenom', 'email', 'telephone',
            'annee_etude', 'mention_envisagee', 'status', 'created_at'
        ])->get();
        
        return Inertia::render('Admin/dashboard', [
            'students' => $students,
            'studentCount' => $students->count(),
        ]);
    })->name('dashboard');
    
    // Student management
    Route::prefix('students')->group(function () {
        Route::get('/', [StudentController::class, 'index'])->name('students.index');
        Route::get('/create', [StudentController::class, 'create'])->name('students.create');
        Route::post('/', [StudentController::class, 'store'])->name('students.store');
        Route::get('/{student}/edit', [StudentController::class, 'edit'])->name('students.edit');
        Route::put('/{student}', [StudentController::class, 'update'])->name('students.update');
        Route::delete('/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
        
        // État civil routes
        Route::resource('{student}/etat-civil', EtatCivilController::class)->except(['index', 'show'])->names([
            'create' => 'students.etat-civil.create',
            'store' => 'students.etat-civil.store',
            'edit' => 'students.etat-civil.edit',
            'update' => 'students.etat-civil.update',
            'destroy' => 'students.etat-civil.destroy',
        ]);
    });

    // Roles management
    Route::resource('roles', RoleController::class);

    // API routes
    Route::get('/api/check-matricule', [MatriculeController::class, 'checkMatricule'])->name('api.check-matricule');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
