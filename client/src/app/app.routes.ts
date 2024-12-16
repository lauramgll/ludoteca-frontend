import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'categories', loadComponent: () => import('./category/category-list/category-list.component').then(m => m.CategoryListComponent)},
];
