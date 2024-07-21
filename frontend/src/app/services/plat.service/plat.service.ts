import { Injectable } from '@angular/core';
// Importation du décorateur Injectable d'Angular pour permettre l'injection de dépendances dans le service.

import { Plat } from '../../shared/models/Plat';
// Importation du modèle Plat depuis le dossier des modèles partagés.

import { sample_plat, sample_tags } from '../../../data';
// Importation de données d'exemple pour les plats et les tags depuis un fichier de données.

import { Observable, of } from 'rxjs';
// Importation d'Observable de RxJS pour travailler avec des flux de données asynchrones, et de 'of' pour créer un Observable à partir de valeurs statiques.

import { map } from 'rxjs/operators';
// Importation de l'opérateur 'map' de RxJS pour transformer les éléments émis par un Observable.

import { Tag } from '../../shared/models/Tag';
// Importation du modèle Tag depuis le dossier des modèles partagés.

@Injectable({
  providedIn: 'root'
})
// Décorateur Injectable avec l'option 'providedIn: root', ce qui signifie que le service est disponible dans toute l'application sans avoir à l'ajouter dans un module spécifique.
export class PlatService {
  // Déclaration de la classe PlatService qui contient la logique métier pour manipuler les plats et les tags.

  constructor() { }
  // Constructeur vide. Peut être utilisé pour injecter des dépendances si nécessaire.

  getAll(): Observable<Plat[]> {
    // Méthode pour obtenir tous les plats. Retourne un Observable qui émet un tableau de plats.
    return of(sample_plat);
    // Utilise 'of' pour créer un Observable à partir des données d'exemple 'sample_plat'.
  }

  getAllPlatsbySearchTerm(searchTerm: string): Observable<Plat[]> {
    // Méthode pour obtenir tous les plats qui correspondent à un terme de recherche. Prend en paramètre un terme de recherche.
    return this.getAll().pipe(
      // Appel à la méthode getAll() pour obtenir tous les plats, puis utilisation de 'pipe' pour chaîner des opérateurs RxJS.
      map(plats => plats.filter(plat =>
        // Utilisation de l'opérateur 'map' pour transformer le tableau de plats en un tableau filtré.
        plat.name.toLowerCase().includes(searchTerm.toLowerCase())
        // Filtre les plats dont le nom contient le terme de recherche, en ignorant la casse.
      ))
    );
  }

  getAllTags(): Tag[]{
    // Méthode pour obtenir tous les tags. Retourne un tableau de tags.
    return sample_tags;
    // Retourne les données d'exemple 'sample_tags'.
  }

  getAllPlatsbyTag(tag: string): Observable<Plat[]> {
    // Méthode pour obtenir tous les plats qui correspondent à un tag spécifique. Prend en paramètre un tag.
    if (tag === 'All') {
      // Si le tag est 'All', retourne tous les plats.
      return this.getAll();
      // Appel à la méthode getAll() pour obtenir tous les plats.
    } else {
      // Sinon, retourne les plats filtrés par le tag spécifié.
      return this.getAll().pipe(
        map(plats => plats.filter(plat => plat.tags?.includes(tag)))
        // Utilisation de 'map' pour transformer le tableau de plats en un tableau filtré par le tag spécifié.
      );
    }
  }

  getPlatbyId(platId: string): Observable<Plat> {
    // Méthode pour obtenir un plat par son ID. Prend en paramètre un ID de plat.
    return this.getAll().pipe(
      // Appel à la méthode getAll() pour obtenir tous les plats, puis utilisation de 'pipe' pour chaîner des opérateurs RxJS.
      map(plats => {
        // Utilisation de 'map' pour trouver le plat avec l'ID spécifié.
        const plat = plats.find(plat => plat.id === platId);
        // Recherche le plat avec l'ID spécifié.
        return plat ? plat : new Plat();
        // Retourne le plat trouvé ou un nouvel objet Plat si aucun plat ne correspond.
      })
    );
  }
  
}
