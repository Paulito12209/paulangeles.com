import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'impressum',
        loadComponent: () => import('./pages/impressum-page/impressum-page.component').then(m => m.ImpressumPageComponent)
    },
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    }
];
