import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../../services/loading.service';

// Définition du composant Angular
@Component({
  selector: 'app-loading', // Sélecteur utilisé dans les templates HTML pour insérer ce composant
  templateUrl: './loading.component.html', // Chemin vers le fichier de template HTML du composant
  styleUrls: ['./loading.component.css'] // Chemin vers le fichier de styles CSS du composant
})
export class LoadingComponent implements OnInit, OnDestroy {

  // Propriété pour suivre l'état de chargement, initialisée à false
  isLoading: boolean = false;

  // Propriété pour stocker l'abonnement à l'observable, initialisée à undefined
  private loadingSubscription!: Subscription;

  // Constructeur pour injecter le service de chargement
  constructor(private loadingService: LoadingService) {}

  // Méthode appelée au moment de l'initialisation du composant
  ngOnInit(): void {
    // S'abonner à l'observable de l'état de chargement fourni par le service
    this.loadingSubscription = this.loadingService.getLoading().subscribe((loading: boolean) => {
      // Mettre à jour la propriété isLoading avec la valeur reçue de l'observable
      this.isLoading = loading;

    });
  }

  // Méthode appelée lorsque le composant est détruit
  ngOnDestroy(): void {
    // Vérifier si l'abonnement existe avant de le désabonner
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe(); // Annuler l'abonnement pour éviter les fuites de mémoire
    }
  }
}
