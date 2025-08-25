import React from 'react';

interface FormErrorsProps {
  errors: Record<string, string>;
  className?: string;
}

export function FormErrors({ errors, className = '' }: FormErrorsProps) {
  if (Object.keys(errors).length === 0) return null;

  return (
    <div className={`mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded ${className}`}>
      <h3 className="text-red-700 font-medium">Veuillez corriger les erreurs suivantes :</h3>
      <ul className="mt-2 list-disc list-inside text-red-600">
        {Object.entries(errors).map(([field, message]) => (
          <li key={field}>
            <span className="capitalize">{field.replace(/_/g, ' ')}</span>: {message}
          </li>
        ))}
      </ul>
    </div>
  );
}
