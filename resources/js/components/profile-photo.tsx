import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface ProfilePhotoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function ProfilePhoto({ className = '', size = 'md' }: ProfilePhotoProps) {
    const { auth } = usePage<SharedData>().props;
    
    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-20 w-20',
    };
    
    const textSizeClasses = {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl',
    };
    
    return (
        <div className={`relative ${className}`}>
            {auth.user.profile_photo_path ? (
                <img 
                    src={`/storage/${auth.user.profile_photo_path}`} 
                    alt="Profile" 
                    className={`${sizeClasses[size]} rounded-full object-cover`}
                />
            ) : (
                <div className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-gray-200 text-gray-500`}>
                    <span className={`${textSizeClasses[size]} font-semibold`}>
                        {auth.user.name.charAt(0)}
                    </span>
                </div>
            )}
        </div>
    );
}
