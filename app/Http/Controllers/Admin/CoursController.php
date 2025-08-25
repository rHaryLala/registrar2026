<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CoursController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Cours/Index', [
            'title' => 'Gestion des Cours',
        ]);
    }
}
