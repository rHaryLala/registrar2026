import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img 
            {...props} 
            src="/logo.png" 
            alt="Logo UAZ Campus" 
            className="h-full w-full object-contain"
        />
    );
}
