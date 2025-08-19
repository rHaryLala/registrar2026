<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'nom', 'prenom', 'sexe', 'date_naissance', 'lieu_naissance', 'adresse', 'region',
        'email', 'password', 'telephone', 'religion', 'etat_civil', 'nom_conjoint', 'nb_enfant',
        'nationalite', 'photo', 'status', 'appartement', 'situation_familiale', 'annee_etude',
        'graduated', 'graduation_date', 'bursary_status', 'new_student', 'bacc_serie',
        'annee_scolaire', 'periode', 'remove', 'date_entry', 'last_change_user_id', 'last_change_datetime'
    ];
    protected $hidden = ['password'];
}