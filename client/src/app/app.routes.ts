import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/games', pathMatch: 'full'},
    { path: 'categories', loadComponent: () => import('./category/category-list/category-list.component').then(m => m.CategoryListComponent)},
    { path: 'authors', loadComponent: () => import('./author/author-list/author-list.component').then(m => m.AuthorListComponent)},
    { path: 'games', loadComponent: () => import('./game/game-list/game-list.component').then(m => m.GameListComponent)},
    { path: 'clients', loadComponent: () => import('./client/client-list/client-list.component').then(m => m.ClientListComponent)},
    { path: 'loans', loadComponent: () => import('./loan/loan-list/loan-list.component').then(m => m.LoanListComponent)}
];
