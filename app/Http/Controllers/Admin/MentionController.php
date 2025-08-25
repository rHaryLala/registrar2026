<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class MentionController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Mentions/Index', [
            'title' => 'Mentions & Parcours',
        ]);
    }
}
