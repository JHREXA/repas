import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';

// Définition des routes de l'application
const routes: Routes = [
    { path: '', component: HomeComponent }, // Route pour la page d'accueil, utilise HomeComponent
    { path: 'search/:searchTerm', component: HomeComponent }, // Route pour la recherche avec un paramètre 'searchTerm', utilise également HomeComponent
    { path: 'tag/:tag', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuration du module de routage avec les routes définies ci-dessus
  exports: [RouterModule] // Exporte RouterModule pour que d'autres modules puissent l'importer
})
export class AppRoutingModule { }
