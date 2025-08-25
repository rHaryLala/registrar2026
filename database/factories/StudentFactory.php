<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $gender = $this->faker->randomElement(['M', 'F']);
        $firstName = $gender === 'M' 
            ? $this->faker->firstNameMale 
            : $this->faker->firstNameFemale;
            
        $lastName = $this->faker->lastName;
        $email = strtolower($firstName[0] . $lastName . '@example.com');
        
        $etatCivil = $this->faker->randomElement(['célibataire', 'marié', 'divorcé', 'veuf']);
        $hasSpouse = in_array($etatCivil, ['marié', 'veuf']);
        
        $isBursary = $this->faker->boolean(30); // 30% de chance d'être boursier
        $baccSeries = ['A1', 'A2', 'C', 'D', 'S', 'L', 'OSE', 'Technique'];
        $regions = [
            'Analamanga', 'Alaotra-Mangoro', 'Amoron\'i Mania', 'Analanjirofo',
            'Androy', 'Anosy', 'Atsimo-Andrefana', 'Atsimo-Atsinanana',
            'Atsinanana', 'Betsiboka', 'Boeny', 'Bongolava',
            'Diana', 'Haute Matsiatra', 'Ihorombe', 'Itasy',
            'Melaky', 'Menabe', 'Sava', 'Sofia', 'Vakinankaratra',
            'Vatovavy-Fitovinany'
        ];
        $mentions = [
            'Théologie', 'Gestion', 'Informatique', 
            'Sciences infirmières', 'Éducation', 'Communication', 'Droit'
        ];

        return [
            'nom' => $lastName,
            'prenom' => $firstName,
            'sexe' => $gender,
            'date_naissance' => $this->faker->dateTimeBetween('-30 years', '-18 years'),
            'lieu_naissance' => $this->faker->city,
            'nationalite' => 'Malagasy',
            'religion' => $this->faker->randomElement(['Catholique', 'Protestant', 'Musulman', 'Autre']),
            'etat_civil' => $etatCivil,
            'nom_conjoint' => $hasSpouse ? $this->faker->name : null,
            'nb_enfant' => $hasSpouse ? $this->faker->numberBetween(0, 5) : 0,
            'photo' => null,
            'cin_numero' => $this->faker->unique()->numerify('#########'),
            'cin_date_delivrance' => $this->faker->dateTimeBetween('-5 years', 'now'),
            'cin_lieu_delivrance' => $this->faker->city,
            'adresse' => $this->faker->address,
            'region' => $this->faker->randomElement($regions),
            'telephone' => '032' . $this->faker->numerify('## ### ##'),
            'email' => $email,
            'password' => 'password123', // Le mutateur le hachera automatiquement
            'plain_password' => 'password123',
            'annee_etude' => $this->faker->randomElement(['L1', 'L2', 'L3', 'M1', 'M2']),
            'status' => $this->faker->randomElement(['actif', 'inactif']),
            'bacc_serie' => $this->faker->randomElement($baccSeries),
            'bacc_date_obtention' => $this->faker->dateTimeBetween('-10 years', '-1 year'),
            'annee_scolaire' => '2024-2025',
            'periode' => $this->faker->randomElement(['Matin', 'Après-midi', 'Soir']),
            'appartement' => $this->faker->randomElement(['A', 'B', 'C', 'D']),
            'situation_familiale' => $this->faker->sentence(),
            'bursary_status' => $isBursary,
            'new_student' => $this->faker->boolean(30), // 30% de nouveaux étudiants
            'graduated' => false,
            'graduation_date' => null,
            'sponsor_nom' => $isBursary ? $this->faker->lastName : null,
            'sponsor_prenom' => $isBursary ? $this->faker->firstName : null,
            'sponsor_telephone' => $isBursary ? '033' . $this->faker->numerify('## ### ##') : null,
            'sponsor_adresse' => $isBursary ? $this->faker->address : null,
            'mention_envisagee' => $this->faker->randomElement($mentions),
            'remove' => false,
            'date_entry' => $this->faker->dateTimeBetween('-5 years', 'now'),
            'last_change_user_id' => 1, // ID de l'administrateur par défaut
            'last_change_datetime' => now(),
        ];
    }

    /**
     * Indicate that the model's status is active.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function active()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'actif',
            ];
        });
    }

    /**
     * Indicate that the model's status is inactive.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function inactive()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'inactif',
            ];
        });
    }

    /**
     * Indicate that the model is a new student.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function newStudent()
    {
        return $this->state(function (array $attributes) {
            return [
                'new_student' => true,
            ];
        });
    }

    /**
     * Indicate that the model is a bursary student.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function bursary()
    {
        return $this->state(function (array $attributes) {
            return [
                'bursary_status' => true,
                'sponsor_nom' => $this->faker->lastName,
                'sponsor_prenom' => $this->faker->firstName,
                'sponsor_telephone' => '033' . $this->faker->numerify('## ### ##'),
                'sponsor_adresse' => $this->faker->address,
            ];
        });
    }
}
