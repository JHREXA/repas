import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search', // Sélecteur CSS pour identifier le composant
  templateUrl: './search.component.html', // Chemin vers le fichier HTML du template du composant
  styleUrls: ['./search.component.css'] // Tableau des chemins vers les fichiers CSS du composant
})
export class SearchComponent {
    searchTerm = ''; // Variable pour stocker le terme de recherche

    constructor(activatedRoute: ActivatedRoute, private router: Router) {
        // Constructeur du composant, injecte ActivatedRoute et Router
        activatedRoute.params.subscribe((params) => {
            // Souscrit aux modifications des paramètres de l'URL
            if (params['searchTerm']) {
                // Vérifie si le paramètre 'searchTerm' est présent dans les paramètres de l'URL
                this.searchTerm = params['searchTerm']; // Met à jour le terme de recherche avec la valeur du paramètre
            }
        });
    }

    search(term: string): void {
        if (term) {
            this.router.navigateByUrl('/search/' + term); // Redirige l'utilisateur vers '/search/:searchTerm'
        }
    }
}
