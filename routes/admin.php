<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\MentionController;
use App\Http\Controllers\Admin\CoursController;
use App\Http\Controllers\Admin\SessionController;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Mentions & Parcours
    Route::resource('mentions', MentionController::class);
    
    // Cours
    Route::resource('cours', CoursController::class);
    
    // Sessions
    Route::resource('sessions', SessionController::class);
});
