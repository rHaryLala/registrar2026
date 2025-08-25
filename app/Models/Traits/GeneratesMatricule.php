<?php

namespace App\Models\Traits;

use App\Services\StudentMatriculeService;

/**
 * Trait pour gérer la génération automatique des matricules étudiants
 */
trait GeneratesMatricule
{
    /**
     * Le "booting" method du trait.
     *
     * @return void
     */
    protected static function bootGeneratesMatricule()
    {
        static::creating(function ($model) {
            if (empty($model->matricule)) {
                $matriculeService = app(StudentMatriculeService::class);
                $model->matricule = $matriculeService->generate($model->mention_envisagee);
            }
        });
    }
}
