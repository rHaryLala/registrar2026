<?php

namespace App\Helpers;

class PasswordHelper
{
    /**
     * Génère un mot de passe au format : [4 chiffres aléatoires]Student[année courante]
     *
     * @return string
     */
    public static function generateStudentPassword(): string
    {
        $randomNumbers = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
        $currentYear = date('Y');
        
        return $randomNumbers . 'Student' . $currentYear;
    }
}
