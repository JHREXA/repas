import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { PlatPageComponent } from './components/pages/plat-page/plat-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';



// Définition des routes de l'application
const routes: Routes = [
    { path: '', component: HomeComponent }, // Route pour la page d'accueil, utilise HomeComponent
    { path: 'search/:searchTerm', component: HomeComponent }, // Route pour la recherche avec un paramètre 'searchTerm', utilise également HomeComponent
    { path: 'tag/:tag', component: HomeComponent},
    { path: 'plat/:id', component: PlatPageComponent},
    { path: 'cart-page', component: CartPageComponent},
    { path: 'login', component: LoginPageComponent},
    { path: 'register', component: RegisterPageComponent},
    { path: 'checkout', component: CheckoutPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuration du module de routage avec les routes définies ci-dessus
  exports: [RouterModule] // Exporte RouterModule pour que d'autres modules puissent l'importer
})
export class AppRoutingModule { }
