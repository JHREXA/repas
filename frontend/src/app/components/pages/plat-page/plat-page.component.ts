// Importation des modules nécessaires depuis Angular et RxJS
import { Component, OnInit } from '@angular/core'; // Importe le décorateur Component pour définir le composant
import { Plat } from '../../../shared/models/Plat'; // Importation du modèle Plat
import { ActivatedRoute, Router } from '@angular/router'; // Importation de ActivatedRoute pour accéder aux paramètres de la route
import { PlatService } from '../../../services/plat.service/plat.service'; // Importation du service PlatService pour obtenir les données des plats
import { Observable, Subscription } from 'rxjs'; // Importation de Observable et Subscription pour la gestion des flux de données asynchrones
import { faHeart, faClock } from '@fortawesome/free-solid-svg-icons'; // Importation des icônes FontAwesome
import { CartService } from '../../../services/cart.service/cart.service';

// Définition du composant Angular avec le décorateur @Component
@Component({
  selector: 'app-plat-page', // Le sélecteur pour utiliser ce composant dans les templates
  templateUrl: './plat-page.component.html', // Chemin vers le fichier HTML du template du composant
  styleUrls: ['./plat-page.component.css'] // Chemin vers le fichier CSS du style du composant
})
export class PlatPageComponent implements OnInit {
  plat$!: Observable<Plat>; // Déclaration d'une propriété pour stocker les données du plat sous forme d'Observable
  faHeart = faHeart; // Déclaration d'une propriété pour l'icône du cœur
  faClock = faClock; // Déclaration d'une propriété pour l'icône de l'horloge

  private subscription: Subscription = new Subscription();

  // Constructeur du composant, utilisé pour l'injection de dépendances
  constructor(
    private activatedRoute: ActivatedRoute, // Injection de ActivatedRoute pour accéder aux paramètres de la route
    private platService: PlatService, // Injection du service PlatService pour obtenir les données du plat
    private cartService: CartService,
    private router: Router
  ) {}

  // Méthode d'initialisation du composant
  ngOnInit(): void {
    // Abonnement aux paramètres de la route pour récupérer l'id du plat depuis l'URL
    this.subscription.add(
      this.activatedRoute.params.subscribe((params) => {
        // Vérifie si un id est présent dans les paramètres de la route
        if (params['id']) {
          // Appelle la méthode du service pour obtenir les données du plat par son id et assigne l'Observable retourné à la propriété 'plat$'
          this.plat$ = this.platService.getPlatbyId(params['id']);
        }
      })
    );
  }

  // Méthode pour ajouter le plat au panier
  ajouterAuPanier(plat: Plat): void {
    this.cartService.ajouterAuPanier(plat);
    this.router.navigateByUrl('/cart-page'); 
  }
}
