import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Details } from './pages/details/details';
import { Favorites } from './pages/favorites/favorites';
import { Layout } from './components/layout/layout';
import { adultGuardGuard } from './guards/adult-guard-guard';

export const routes: Routes = [
    { path: 'tv-maze', component: Layout, children: [
        { path: 'home', component: Home },
        { path: 'show/:id', component: Details, canActivate: [adultGuardGuard] },
        { path: 'favorites', component: Favorites },
        { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]},
    { path: '', redirectTo: 'tv-maze/home', pathMatch: 'full' }
];
