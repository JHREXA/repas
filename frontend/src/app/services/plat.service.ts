import { Injectable } from '@angular/core';
// Importation du décorateur Injectable d'Angular pour permettre l'injection de dépendances dans le service.

import { Plat } from '../shared/models/Plat'; 
// Importation du modèle Plat depuis le dossier des modèles partagés.

import { sample_plat, sample_tags } from '../../data'; 
// Importation de données d'exemple pour les plats et les tags depuis un fichier de données.

import { Observable, of } from 'rxjs';
// Importation d'Observable de RxJS pour travailler avec des flux de données asynchrones, et de 'of' pour créer un Observable à partir de valeurs statiques.

import { catchError, map } from 'rxjs/operators';
// Importation de l'opérateur 'map' de RxJS pour transformer les éléments émis par un Observable.

import { Tag } from '../shared/models/Tag'; 
import { HttpClient } from '@angular/common/http';
import { PLATS_BY_ID_URL, PLATS_BY_SEARCH_URL, PLATS_BY_TAG_URL, PLATS_TAGS_URL, PLATS_URL } from '../shared/constants/urls'; 
// Importation du modèle Tag depuis le dossier des modèles partagés.

@Injectable({
  providedIn: 'root'
})
// Décorateur Injectable avec l'option 'providedIn: root', ce qui signifie que le service est disponible dans toute l'application sans avoir à l'ajouter dans un module spécifique.
export class PlatService {
  // Déclaration de la classe PlatService qui contient la logique métier pour manipuler les plats et les tags.

  constructor(private http: HttpClient) { }
  // Constructeur vide. Peut être utilisé pour injecter des dépendances si nécessaire.

  getAll(): Observable<Plat[]> {
    return this.http.get<Plat[]>(PLATS_URL).pipe(
      catchError(error => {
        console.error('Error fetching plats:', error);
        return of([]);  // Retourne un tableau vide en cas d'erreur
      })
    );
  }

  getAllPlatsbySearchTerm(searchTerm: string): Observable<Plat[]> {
    // Méthode pour obtenir tous les plats qui correspondent à un terme de recherche. Prend en paramètre un terme de recherche.
    return this.http.get<Plat[]>(PLATS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]>{
    // Méthode pour obtenir tous les tags. Retourne un tableau de tags.
    return this.http.get<Tag[]>(PLATS_TAGS_URL);
  }

  getAllPlatsbyTag(tag: string): Observable<Plat[]> {
    // Méthode pour obtenir tous les plats qui correspondent à un tag spécifique. Prend en paramètre un tag.
    if (tag === 'All') {
      // Si le tag est 'All', retourne tous les plats.
      return this.getAll();
      // Appel à la méthode getAll() pour obtenir tous les plats.
    } else {
      // Sinon, retourne les plats filtrés par le tag spécifié.
      return this.http.get<Plat[]>(PLATS_BY_TAG_URL + tag);
    }
  }

  getPlatbyId(platId: string): Observable<Plat> {
    // Méthode pour obtenir un plat par son ID. Prend en paramètre un ID de plat.
    return this.http.get<Plat>(PLATS_BY_ID_URL + platId);
  }
  
}
