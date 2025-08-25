<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cin extends Model
{
    protected $fillable = [
        'student_id',
        'numero',
        'date_delivrance',
        'lieu_delivrance'
    ];

    protected $casts = [
        'date_delivrance' => 'date',
    ];

    /**
     * Get the student that owns the CIN.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
