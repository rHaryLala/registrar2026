import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import PageTransition from './components/page-transition';
import { router } from '@inertiajs/react'; 

const appName = import.meta.env.VITE_APP_NAME || 'UAZ Campus';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <PageTransition>
                <App {...props} />
            </PageTransition>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// Initialisation du thème
initializeTheme();

// 
// 🔥 Ajout des événements Inertia pour lancer les transitions
router.on('start', () => {
    document.body.classList.add('page-transitioning'); // ou appelle une fonction dans PageTransition
});

router.on('finish', () => {
    document.body.classList.remove('page-transitioning');
});
