<?php

namespace App\Services;

use App\Models\Student;
use Illuminate\Support\Facades\DB;

class StudentMatriculeService
{
    // Définition des préfixes par mention
    protected const PREFIXES = [
        'théologie' => '1',
        'gestion' => '2',
        'informatique' => '3',
        'science infirmières' => '4',
        'communication' => '6',
        'études anglophones' => '7',
        'droit' => '9',
        'default' => '0'
    ];

    // Longueur du numéro séquentiel
    protected const SEQUENCE_LENGTH = 4;

    /**
     * Génère un nouveau matricule basé sur la mention
     *
     * @param string $mention
     * @return string
     */
    public function generate(string $mention): string
    {
        $prefix = $this->getPrefixForMention($mention);
        $nextNumber = $this->getNextSequenceNumber($prefix);
        
        return $prefix . str_pad($nextNumber, self::SEQUENCE_LENGTH, '0', STR_PAD_LEFT);
    }

    /**
     * Récupère le préfixe pour une mention donnée
     *
     * @param string $mention
     * @return string
     */
    protected function getPrefixForMention(string $mention): string
    {
        $mention = strtolower(trim($mention));
        
        foreach (self::PREFIXES as $key => $prefix) {
            if ($key !== 'default' && str_contains($mention, $key)) {
                return $prefix;
            }
        }
        
        return self::PREFIXES['default'];
    }

    /**
     * Récupère le prochain numéro de séquence pour un préfixe donné
     *
     * @param string $prefix
     * @return int
     */
    protected function getNextSequenceNumber(string $prefix): int
    {
        // Récupère le dernier matricule existant avec ce préfixe
        $lastMatricule = Student::where('matricule', 'like', $prefix . '%')
            ->orderBy('matricule', 'desc')
            ->value('matricule');

        if (!$lastMatricule) {
            return 1; // Premier numéro de la série
        }

        // Extrait le numéro séquentiel du dernier matricule
        $lastNumber = (int) substr($lastMatricule, strlen($prefix));
        
        return $lastNumber + 1;
    }
}
