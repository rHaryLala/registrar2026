<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StudentController;
use App\Models\Student;
use App\Http\Controllers\RoleController;

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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
