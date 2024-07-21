// Import des éléments nécessaires depuis les modules Angular et autres sources externes
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plat } from '../../../shared/models/Plat';
import { PlatService } from '../../../services/plat.service/plat.service';
import { faHeart, faClock } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// Définition du composant Angular
@Component({
  selector: 'app-home', // Sélecteur CSS pour identifier le composant
  templateUrl: './home.component.html', // Chemin vers le fichier HTML du template du composant
  styleUrls: ['./home.component.css'] // Tableau des chemins vers les fichiers CSS du composant
})
export class HomeComponent implements OnInit, OnDestroy {
    plats: Plat[] = []; // Déclaration d'un tableau vide pour stocker les plats
    faHeart = faHeart; // Initialisation d'une icône (un cœur) à partir de FontAwesome
    faClock = faClock;
    errorHttp = false; // Variable pour indiquer s'il y a eu une erreur HTTP
    private subscription!: Subscription; // Variable pour stocker l'abonnement à une souscription

    constructor(private platService: PlatService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        // Initialisation du composant au chargement
        this.subscription = this.activatedRoute.params.subscribe({
            next: (params) => { // Abonnement aux modifications des paramètres de l'URL
                if (params['searchTerm']) {
                    // Si un terme de recherche est présent dans les paramètres de l'URL
                    this.platService.getAllPlatsbySearchTerm(params['searchTerm']).subscribe({
                        next: (plats) => {
                            this.plats = plats; // Mise à jour des plats avec les résultats de la recherche
                            this.errorHttp = false; // Réinitialisation de l'indicateur d'erreur HTTP
                        },
                        error: (error) => {
                            console.error('Error fetching plats by search term:', error);
                            this.errorHttp = true; // Marquage d'une erreur HTTP en cas de problème
                        }
                    });
                } 
                else if (params['tag']) {
                    // Utilisation de l'observable pour récupérer les plats par tag
                    this.platService.getAllPlatsbyTag(params['tag']).subscribe({
                        next: (plats) => {
                            this.plats = plats; // Mise à jour des plats avec les résultats filtrés par tag
                            this.errorHttp = false; // Réinitialisation de l'indicateur d'erreur HTTP
                        },
                        error: (error) => {
                            console.error('Error fetching plats by tag:', error);
                            this.errorHttp = true; // Marquage d'une erreur HTTP en cas de problème
                        }
                    });
                } else {
                    // Si aucun terme de recherche ni tag n'est présent, récupération de tous les plats
                    this.platService.getAll().subscribe({
                        next: (plats) => {
                            this.plats = plats; // Mise à jour des plats
                            this.errorHttp = false; // Réinitialisation de l'indicateur d'erreur HTTP
                        },
                        error: (error) => {
                            console.error('Error fetching all plats:', error);
                            this.errorHttp = true; // Marquage d'une erreur HTTP en cas de problème
                        }
                    });
                }
            },
            error: (error) => {
                console.error('Error fetching params:', error);
                this.errorHttp = true; // Marquage d'une erreur HTTP en cas de problème avec les paramètres
            }
            
        });
    }

    ngOnDestroy() {
        // Méthode appelée lors de la destruction du composant
        if (this.subscription) {
            this.subscription.unsubscribe(); // Désabonnement pour éviter les fuites de mémoire
        }
    }
}
