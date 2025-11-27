import { Routes } from '@angular/router';

export default[
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password').then(m => m.ForgotPassword)
  },
  {
    path: 'terms-conditions',
    loadComponent: () => import('./terms-conditions/terms-conditions').then(m => m.TermsConditions)
  },

]as Routes;
