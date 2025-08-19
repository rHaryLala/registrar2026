<?php
namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::all();
        return Inertia::render('students/index', [
            'students' => $students,
        ]);
    }

    public function create()
    {
        return Inertia::render('students/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|max:150',
            'prenom' => 'required|max:150',
            'sexe' => 'required',
            'date_naissance' => 'required|date',
            'lieu_naissance' => 'required|max:150',
            'adresse' => 'required|max:200',
            'region' => 'required|max:255',
            'email' => 'required|email|unique:students,email',
            'password' => 'required|min:6',
            'telephone' => 'required|max:150',
            'religion' => 'required|max:30',
            'etat_civil' => 'required|in:célibataire,marié,divorcé,veuf',
            'nom_conjoint' => 'nullable|max:150',
            'nb_enfant' => 'integer|min:0',
            'nationalite' => 'required|max:30',
            'photo' => 'nullable|image|max:2048',
            'status' => 'required|max:150',
            'appartement' => 'required|max:150',
            'situation_familiale' => 'required|max:150',
            'annee_etude' => 'required|max:40',
            'graduated' => 'boolean',
            'graduation_date' => 'nullable|date',
            'bursary_status' => 'boolean',
            'new_student' => 'boolean',
            'bacc_serie' => 'required|max:10',
            'annee_scolaire' => 'required|max:200',
            'periode' => 'required|max:200',
            'remove' => 'boolean',
            'last_change_user_id' => 'required|exists:users,id',
            'last_change_datetime' => 'nullable|date',
        ]);
        $validated['password'] = Hash::make($validated['password']);
        Student::create($validated);
        return redirect()->route('students.create')->with('success', 'Inscription réussie !');
    }

        public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:150',
            'prenom' => 'required|string|max:150',
            'email' => 'required|email|unique:students,email,'.$student->id,
            'date_naissance' => 'required|date',
        ]);

        $student->update($validated);

        return redirect()->route('students.index')->with('success', 'Étudiant mis à jour');
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->route('students.index')->with('success', 'Étudiant supprimé');
    }
}