import { Routes } from '@angular/router';

export default[
  {
    path: 'quote', // Módulo 8
    loadComponent: () => import('./custom-quote/custom-quote').then(m => m.CustomQuoteComponent)
  },
  {
    path: 'community', // Módulo 7
    loadComponent: () => import('./community-gallery/community-gallery').then(m => m.CommunityGalleryComponent)
  },
  {
    path: 'suggestions', // Módulo 11
    loadComponent: () => import('./suggestions-box/suggestions-box').then(m => m.SuggestionsBoxComponent)
    // Revisa si corregiste el nombre de la clase "Componentnt", si ya lo corregiste borra las letras extra aquí.
  },
  {
    path: 'kidik', // Módulo 10
    loadComponent: () => import('./chatbot-kidik/chatbot-kidik').then(m => m.ChatbotComponent)
  }
]as Routes;
