import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StudentFormModal from '@/components/student-form';
import { useState } from 'react';

export default function StudentRegister() {
  const [open, setOpen] = useState(true);
  const { data, setData, post, processing, errors, reset } = useForm({
    // Les champs seront gérés par le composant StudentFormModal
  });

  const handleSuccess = () => {
    // Rediriger vers une page de succès ou de connexion
    window.location.href = route('login');
  };

  return (
    <>
      <Head title="Inscription Étudiant" />
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Inscription Étudiant</CardTitle>
            <CardDescription className="text-center">
              Remplissez le formulaire ci-dessous pour créer votre compte étudiant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StudentFormModal 
              open={open} 
              onOpenChange={setOpen}
              onSuccess={handleSuccess}
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Vous avez déjà un compte ?{' '}
              <Link href={route('login')} className="text-blue-600 hover:underline dark:text-blue-400">
                Connectez-vous ici
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
