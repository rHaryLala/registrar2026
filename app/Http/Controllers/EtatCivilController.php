<?php

namespace App\Http\Controllers;

use App\Models\EtatCivil;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EtatCivilController extends Controller
{
    /**
     * Afficher le formulaire de création de l'état civil.
     */
    public function create(Student $student)
    {
        return view('students.etat_civil.create', compact('student'));
    }

    /**
     * Enregistrer un nouvel état civil.
     */
    public function store(Request $request, Student $student)
    {
        $validated = $request->validate([
            'situation' => 'required|in:célibataire,marié,divorcé,veuf',
            'nom_conjoint' => 'nullable|string|max:150',
            'nb_enfant' => 'nullable|integer|min:0',
        ]);

        try {
            DB::beginTransaction();
            
            // Créer l'état civil
            $etatCivil = $student->etatCivil()->create($validated);
            
            DB::commit();
            
            return redirect()
                ->route('students.show', $student)
                ->with('success', 'État civil enregistré avec succès');
                
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erreur lors de la création de l\'état civil : ' . $e->getMessage());
            
            return back()
                ->withInput()
                ->withErrors(['error' => 'Une erreur est survenue lors de l\'enregistrement de l\'état civil.']);
        }
    }

    /**
     * Afficher le formulaire d'édition de l'état civil.
     */
    public function edit(Student $student, EtatCivil $etatCivil)
    {
        return view('students.etat_civil.edit', compact('student', 'etatCivil'));
    }

    /**
     * Mettre à jour l'état civil.
     */
    public function update(Request $request, Student $student, EtatCivil $etatCivil)
    {
        $validated = $request->validate([
            'situation' => 'required|in:célibataire,marié,divorcé,veuf',
            'nom_conjoint' => 'nullable|string|max:150',
            'nb_enfant' => 'nullable|integer|min:0',
        ]);

        try {
            DB::beginTransaction();
            
            // Mettre à jour l'état civil
            $etatCivil->update($validated);
            
            DB::commit();
            
            return redirect()
                ->route('students.show', $student)
                ->with('success', 'État civil mis à jour avec succès');
                
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erreur lors de la mise à jour de l\'état civil : ' . $e->getMessage());
            
            return back()
                ->withInput()
                ->withErrors(['error' => 'Une erreur est survenue lors de la mise à jour de l\'état civil.']);
        }
    }

    /**
     * Supprimer l'état civil.
     */
    public function destroy(Student $student, EtatCivil $etatCivil)
    {
        try {
            DB::beginTransaction();
            
            $etatCivil->delete();
            
            DB::commit();
            
            return redirect()
                ->route('students.show', $student)
                ->with('success', 'État civil supprimé avec succès');
                
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erreur lors de la suppression de l\'état civil : ' . $e->getMessage());
            
            return back()
                ->withErrors(['error' => 'Une erreur est survenue lors de la suppression de l\'état civil.']);
        }
    }
}
