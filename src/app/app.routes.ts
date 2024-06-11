import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/contacts/contacts.component').then(r => r.ContactsComponent)
    },
    {
        path: 'details/:id',
        loadComponent: () => import('./pages/details/details.component').then(r => r.DetailsComponent)
    },
    {
        path: 'add-contact',
        loadComponent: () => import('./pages/add-contact/add-contact.component').then(r => r.AddContactComponent)
    },
    {
        path: 'edit-contact/:id',
        loadComponent: () => import('./pages/add-contact/add-contact.component').then(r => r.AddContactComponent)
    }
];
