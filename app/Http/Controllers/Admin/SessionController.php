<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class SessionController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Sessions/Index', [
            'title' => 'Gestion des Sessions',
        ]);
    }
}
