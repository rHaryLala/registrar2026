<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Hash;
use App\Models\Traits\GeneratesMatricule;

class Student extends Model
{
    use HasFactory, GeneratesMatricule;

    protected $fillable = [
        'user_id', 'matricule', 'nom', 'prenom', 'sexe', 'date_naissance', 'lieu_naissance', 'nationalite',
        'religion', 'photo', 'annee_etude', 'status', 'bacc_serie', 'bacc_date_obtention', 
        'annee_scolaire', 'periode', 'appartement', 'situation_familiale', 'bursary_status', 
        'new_student', 'graduated', 'graduation_date', 'sponsor_nom', 'sponsor_prenom', 
        'sponsor_telephone', 'sponsor_adresse', 'mention_envisagee', 'remove', 'date_entry',
        'last_change_user_id', 'last_change_datetime'
    ];

    /**
     * Relation avec le modèle User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $casts = [
        'date_naissance' => 'date',
        'bacc_date_obtention' => 'date',
        'graduation_date' => 'date',
        'date_entry' => 'date',
        'last_change_datetime' => 'datetime',
        'bursary_status' => 'boolean',
        'new_student' => 'boolean',
        'graduated' => 'boolean',
        'remove' => 'boolean'
    ];
    
    /**
     * Get the CIN associated with the student.
     */
    public function cin()
    {
        return $this->hasOne(Cin::class);
    }
    
    /**
     * Get the contact information associated with the student.
     */
    public function contact()
    {
        return $this->hasOne(Contact::class);
    }
    
    /**
     * Get the parents associated with the student.
     */
    public function parents()
    {
        return $this->hasMany(Parents::class);
    }
    
    /**
     * Get the etat civil record associated with the student.
     */
    public function etatCivil()
    {
        return $this->hasOne(EtatCivil::class);
    }

    protected $attributes = [
        'status' => 'actif',
        'new_student' => true,
        'graduated' => false,
        'remove' => false,
        'bursary_status' => false,
    ];

    protected static function booted()
    {
        static::creating(function ($student) {
            $student->last_change_user_id = auth()->id();
            $student->last_change_datetime = now();
        });

        static::updating(function ($student) {
            $student->last_change_user_id = auth()->id();
            $student->last_change_datetime = now();
        });
    }

    // La relation user() est déjà définie plus haut dans le fichier
    // Cette méthode en double a été supprimée

    public function getFullNameAttribute()
    {
        return "{$this->prenom} {$this->nom}";
    }
}