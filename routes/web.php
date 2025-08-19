<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StudentController;
use App\Models\Student;

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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
