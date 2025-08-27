import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
    
    interface Window {
        csrf_token: string;
    }
}
