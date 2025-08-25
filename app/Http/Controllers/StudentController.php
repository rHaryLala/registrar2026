<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::orderBy('id', 'desc')->get();
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
        // Démarrer une transaction de base de données
        DB::beginTransaction();

        try {
            $rules = [
                // Informations personnelles
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'sexe' => 'required|in:M,F',
                'date_naissance' => 'required|date',
                'lieu_naissance' => 'required|string|max:255',
                'nationalite' => 'required|string|max:255',
                'religion' => 'nullable|string|max:255',
                'etat_civil' => 'required|in:célibataire,marié,divorcé,veuf',
                'nom_conjoint' => 'nullable|string|max:255',
                'nb_enfant' => 'nullable|integer|min:0',
                'photo' => 'nullable|string',
                'cin_numero' => 'nullable|string|max:255',
                'cin_date_delivrance' => 'nullable|date',
                'cin_lieu_delivrance' => 'nullable|string|max:255',
                'adresse' => 'required|string|max:500',
                'region' => 'required|string|max:100',
                'telephone' => 'nullable|string|max:20',
                'annee_etude' => 'required|string|max:10',
                'status' => 'required|in:actif,inactif,diplômé,abandon',
                'bacc_serie' => 'nullable|string|max:10',
                'bacc_date_obtention' => 'nullable|date',
                'mention_envisagee' => 'required|string|max:100',
                'bursary_status' => 'sometimes|boolean',
            ];

            // Ajouter la validation conditionnelle pour les champs du sponsor
            if ($request->input('bursary_status') === true || $request->input('bursary_status') === '1') {
                $rules['sponsor_nom'] = 'required|string|max:255';
                $rules['sponsor_prenom'] = 'required|string|max:255';
                $rules['sponsor_telephone'] = 'required|string|max:20';
                $rules['sponsor_adresse'] = 'required|string|max:500';
            } else {
                $rules['sponsor_nom'] = 'nullable|string|max:255';
                $rules['sponsor_prenom'] = 'nullable|string|max:255';
                $rules['sponsor_telephone'] = 'nullable|string|max:20';
                $rules['sponsor_adresse'] = 'nullable|string|max:500';
            }

            $validated = $request->validate($rules);

            // Vérifier que tous les champs CIN sont remplis si au moins un est fourni
            $hasSomeCinData = $request->filled('cin_numero') || $request->filled('cin_date_delivrance') || $request->filled('cin_lieu_delivrance');
            $hasAllCinData = $request->filled('cin_numero') && $request->filled('cin_date_delivrance') && $request->filled('cin_lieu_delivrance');
            
            if ($hasSomeCinData && !$hasAllCinData) {
                return back()
                    ->withInput()
                    ->withErrors(['error' => 'Tous les champs du CIN doivent être remplis.']);
            }

            // Définir les valeurs par défaut pour les champs optionnels
            $defaults = [
                'status' => 'en attente',
                'new_student' => true,
                'graduated' => false,
                'remove' => false,
                'date_entry' => now()->format('Y-m-d'),
                'last_change_user_id' => auth()->id(),
                'last_change_datetime' => now(),
            ];

            // Fusionner les valeurs validées avec les valeurs par défaut
            $studentData = array_merge($defaults, $validated);

            // Supprimer les champs qui ne sont pas dans la table students avant la création de l'utilisateur
            $userData = [
                'name' => $studentData['prenom'] . ' ' . $studentData['nom'],
                'email' => $studentData['email'],
                'telephone' => $studentData['telephone'] ?? null,
                'role_id' => 4, // Rôle étudiant
            ];
            
            // Générer un mot de passe au format [4 chiffres]Student[année]
            $plainPassword = \App\Helpers\PasswordHelper::generateStudentPassword();
            $userData['password'] = Hash::make($plainPassword);
            $userData['plain_password'] = $plainPassword;
            
            // Créer l'utilisateur d'abord
            $user = User::create($userData);
            
            // Préparer les données pour la création de l'étudiant
            $studentFields = [
                'user_id' => $user->id,
                'nom' => $studentData['nom'],
                'prenom' => $studentData['prenom'],
                'sexe' => $studentData['sexe'],
                'date_naissance' => $studentData['date_naissance'],
                'lieu_naissance' => $studentData['lieu_naissance'],
                'nationalite' => $studentData['nationalite'],
                'religion' => $studentData['religion'] ?? null,
                'photo' => $studentData['photo'] ?? null,
                'annee_etude' => $studentData['annee_etude'],
                'status' => $studentData['status'] ?? 'inactif',
                'bacc_serie' => $studentData['bacc_serie'] ?? null,
                'bacc_date_obtention' => $studentData['bacc_date_obtention'] ?? null,
                'mention_envisagee' => $studentData['mention_envisagee'],
                'bursary_status' => $studentData['bursary_status'] ?? false,
                'new_student' => $studentData['new_student'] ?? true,
                'graduated' => $studentData['graduated'] ?? false,
                'last_change_user_id' => auth()->id(),
                'last_change_datetime' => now(),
            ];
            
            // Log pour déboguer les données avant création
            Log::info('Données avant création de l\'étudiant : ', $studentFields);
            
            // Créer l'étudiant
            $student = Student::create($studentFields);
            
            // Créer l'entrée CIN uniquement si les informations sont fournies
            if ($request->filled('cin_numero') && $request->filled('cin_date_delivrance') && $request->filled('cin_lieu_delivrance')) {
                $student->cin()->create([
                    'numero' => $request->input('cin_numero'),
                    'date_delivrance' => $request->input('cin_date_delivrance'),
                    'lieu_delivrance' => $request->input('cin_lieu_delivrance')
                ]);
            }
            
            // Créer l'entrée Contact
            $student->contact()->create([
                'adresse' => $request->input('adresse'),
                'region' => $request->input('region'),
                'telephone' => $request->input('telephone'),
                'email' => $request->input('email')
            ]);
            
            // Créer l'entrée EtatCivil avec une valeur par défaut pour nb_enfant
            $etatCivilData = [
                'situation' => $request->input('etat_civil'),
                'nom_conjoint' => $request->input('nom_conjoint'),
                'nb_enfant' => $request->filled('nb_enfant') ? (int)$request->input('nb_enfant') : 0
            ];
            
            $student->etatCivil()->create($etatCivilData);
            
            // Créer les entrées pour les parents
            if ($request->has('parents')) {
                foreach ($request->input('parents') as $parentData) {
                    $student->parents()->create([
                        'name' => $parentData['name'],
                        'relation' => $parentData['relation'],
                        'phone' => $parentData['phone'] ?? null,
                        'email' => $parentData['email'] ?? null
                    ]);
                }
            }
            
            // Valider la transaction
            DB::commit();
            
            Log::info('Étudiant et utilisateur créés avec succès. ID: ' . $student->id);
            
            return redirect()
                ->route('students.index')
                ->with('success', 'Étudiant créé avec succès !');
                
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return back()
                ->withErrors($e->errors())
                ->withInput();
                
        } catch (\Exception $e) {
            // Annuler la transaction en cas d'erreur
            DB::rollBack();
            Log::error('Erreur lors de la création de l\'étudiant : ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            
            return back()
                ->withInput()
                ->withErrors([
                    'error' => 'Une erreur est survenue lors de la création de l\'étudiant.',
                    'exception' => $e->getMessage()
                ]);
        }
    }

    public function update(Request $request, Student $student)
    {
        // Démarrer une transaction
        DB::beginTransaction();

        try {
            $validated = $request->validate([
                'nom' => 'required|string|max:150',
                'prenom' => 'required|string|max:150',
                'email' => 'required|email|unique:users,email,' . ($student->user ? $student->user->id : 'NULL') . ',id',
                'date_naissance' => 'required|date',
                'lieu_naissance' => 'required|string|max:255',
                'nationalite' => 'required|string|max:100',
                'religion' => 'nullable|string|max:100',
                'telephone' => 'nullable|string|max:20',
                'status' => 'required|in:actif,inactif,diplômé,abandon',
                'annee_etude' => 'required|string|max:20',
                'bacc_serie' => 'nullable|string|max:10',
                'bacc_date_obtention' => 'nullable|date',
                'mention_envisagee' => 'required|string|max:100',
                'cin_numero' => 'nullable|string|max:50',
                'cin_date_delivrance' => 'nullable|date',
                'cin_lieu_delivrance' => 'nullable|string|max:255',
                'adresse' => 'required|string|max:255',
                'region' => 'required|string|max:100',
                'etat_civil' => 'required|in:célibataire,marié,divorcé,veuf',
                'nom_conjoint' => 'nullable|string|max:150',
                'nb_enfant' => 'nullable|integer|min:0',
                'sponsor_nom' => 'nullable|string|max:150',
                'sponsor_prenom' => 'nullable|string|max:150',
                'sponsor_telephone' => 'nullable|string|max:20',
                'sponsor_adresse' => 'nullable|string|max:255',
            ]);

            // Préparer les données de l'étudiant
            $studentData = [
                'nom' => $validated['nom'],
                'prenom' => $validated['prenom'],
                'date_naissance' => $validated['date_naissance'],
                'lieu_naissance' => $validated['lieu_naissance'],
                'nationalite' => $validated['nationalite'],
                'religion' => $validated['religion'] ?? null,
                'status' => $validated['status'],
                'annee_etude' => $validated['annee_etude'],
                'bacc_serie' => $validated['bacc_serie'] ?? null,
                'bacc_date_obtention' => $validated['bacc_date_obtention'] ?? null,
                'mention_envisagee' => $validated['mention_envisagee'],
                'sponsor_nom' => $validated['sponsor_nom'] ?? null,
                'sponsor_prenom' => $validated['sponsor_prenom'] ?? null,
                'sponsor_telephone' => $validated['sponsor_telephone'] ?? null,
                'sponsor_adresse' => $validated['sponsor_adresse'] ?? null,
                'last_change_user_id' => auth()->id(),
                'last_change_datetime' => now(),
            ];

            // Mettre à jour l'étudiant
            $student->update($studentData);
            
            // Mettre à jour l'utilisateur associé s'il existe
            if ($student->user) {
                $student->user->update([
                    'name' => $validated['prenom'] . ' ' . $validated['nom'],
                    'email' => $validated['email'],
                    'telephone' => $validated['telephone'] ?? null,
                ]);
            }
            
            // Gérer le CIN
            $hasCinData = !empty($validated['cin_numero']) || !empty($validated['cin_date_delivrance']) || !empty($validated['cin_lieu_delivrance']);
            
            if ($hasCinData) {
                // Vérifier que tous les champs requis sont présents
                if (empty($validated['cin_numero']) || empty($validated['cin_date_delivrance']) || empty($validated['cin_lieu_delivrance'])) {
                    return back()
                        ->withInput()
                        ->withErrors(['error' => 'Tous les champs du CIN doivent être remplis.']);
                }
                
                if ($student->cin) {
                    $student->cin->update([
                        'numero' => $validated['cin_numero'],
                        'date_delivrance' => $validated['cin_date_delivrance'],
                        'lieu_delivrance' => $validated['cin_lieu_delivrance'],
                    ]);
                } else {
                    $student->cin()->create([
                        'numero' => $validated['cin_numero'],
                        'date_delivrance' => $validated['cin_date_delivrance'],
                        'lieu_delivrance' => $validated['cin_lieu_delivrance'],
                    ]);
                }
            } elseif ($student->cin) {
                // Supprimer le CIN s'il existe mais qu'aucune donnée n'est fournie
                $student->cin->delete();
            }
            
            // Mettre à jour ou créer l'entrée Contact
            if ($student->contact) {
                $student->contact->update([
                    'adresse' => $validated['adresse'],
                    'region' => $validated['region'],
                    'telephone' => $validated['telephone'] ?? null,
                    'email' => $validated['email']
                ]);
            } else {
                $student->contact()->create([
                    'adresse' => $validated['adresse'],
                    'region' => $validated['region'],
                    'telephone' => $validated['telephone'] ?? null,
                    'email' => $validated['email']
                ]);
            }
            
            // Mettre à jour ou créer l'entrée EtatCivil
            $etatCivilData = [
                'situation' => $validated['etat_civil'],
                'nom_conjoint' => $validated['nom_conjoint'] ?? null,
                'nb_enfant' => $validated['nb_enfant'] ?? 0
            ];
            
            if ($student->etatCivil) {
                $student->etatCivil->update($etatCivilData);
            } else {
                $student->etatCivil()->create($etatCivilData);
            }
            
            // Valider la transaction
            DB::commit();
            
            return redirect()
                ->route('students.index')
                ->with('success', 'Étudiant mis à jour avec succès');
                
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return back()
                ->withErrors($e->errors())
                ->withInput();
                
        } catch (\Exception $e) {
            // Annuler la transaction en cas d'erreur
            DB::rollBack();
            Log::error('Erreur lors de la mise à jour de l\'étudiant : ' . $e->getMessage());
            
            return back()
                ->withInput()
                ->withErrors([
                    'error' => 'Une erreur est survenue lors de la mise à jour de l\'étudiant.',
                    'exception' => $e->getMessage()
                ]);
        }
    }

    public function destroy(Student $student)
    {
        // Démarrer une transaction
        DB::beginTransaction();

        try {
            // Récupérer l'utilisateur associé s'il existe
            $user = $student->user;
            
            // Supprimer l'étudiant
            $student->delete();
            
            // Supprimer l'utilisateur associé s'il existe
            if ($user) {
                $user->delete();
            }
            
            // Valider la transaction
            DB::commit();
            
            return redirect()
                ->route('students.index')
                ->with('success', 'Étudiant et compte utilisateur associé supprimés avec succès');
                
        } catch (\Exception $e) {
            // Annuler la transaction en cas d'erreur
            DB::rollBack();
            Log::error('Erreur lors de la suppression de l\'étudiant : ' . $e->getMessage());
            
            return back()
                ->withErrors([
                    'error' => 'Une erreur est survenue lors de la suppression de l\'étudiant.',
                    'exception' => $e->getMessage()
                ]);
        }
    }
}