<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

class MatriculeController extends Controller
{
    /**
     * Vérifie si un matricule existe déjà
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkMatricule(Request $request)
    {
        $request->validate([
            'matricule' => 'required|string',
        ]);

        $exists = Student::where('matricule', $request->matricule)->exists();

        return response()->json([
            'exists' => $exists,
            'message' => $exists ? 'Ce matricule est déjà utilisé.' : 'Matricule disponible.'
        ]);
    }
}
