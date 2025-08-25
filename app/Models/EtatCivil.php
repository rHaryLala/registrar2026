<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EtatCivil extends Model
{
    protected $table = 'etat_civil';

    protected $fillable = [
        'student_id',
        'situation',
        'nom_conjoint',
        'nb_enfant'
    ];

    protected $casts = [
        'nb_enfant' => 'integer',
    ];

    /**
     * Get the student that owns the etat civil record.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
