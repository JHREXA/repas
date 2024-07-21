// Importation des modules nécessaires depuis Angular et RxJS
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../../shared/models/Cart'; 
import { Plat } from '../../shared/models/Plat'; 
import { CartItem } from '../../shared/models/CartItem'; 

// Décorateur @Injectable permet à Angular de savoir que ce service peut être injecté dans d'autres composants ou services
@Injectable({
  providedIn: 'root'  // Le service sera disponible à l'échelle de l'application
})
export class CartService {

  // Initialisation du panier avec les données stockées dans le local storage ou un panier vide
  private cart: Cart = this.isLocalStorageAvailable() ? this.obtenirCartDuLocalStorage() : new Cart(); 
  // Création d'un BehaviorSubject pour émettre les mises à jour du panier aux abonnés
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  // Constructeur de la classe CartService
  constructor() { }

  // Méthode pour ajouter un plat au panier
  ajouterAuPanier(plat: Plat): void {
    // Vérifie si le plat est déjà dans le panier
    let cartItem = this.cart.items.find(item => item.plat.id === plat.id);

    // Si le plat est déjà dans le panier, ne rien faire
    if (cartItem) return;

    // Ajoute un nouvel élément au panier
    this.cart.items.push(new CartItem(plat));
    // Sauvegarde le panier dans le local storage et notifie les abonnés
    this.poserCarAuLocalStorage();
  }

  // Méthode pour enlever un plat du panier par son ID
  enleverDuPanier(platId: string): void {
    // Filtre les éléments pour enlever celui avec le plat correspondant à platId
    this.cart.items = this.cart.items.filter(item => item.plat.id !== platId);
    // Sauvegarde le panier dans le local storage et notifie les abonnés
    this.poserCarAuLocalStorage();
  }

  // Méthode pour changer la quantité d'un plat dans le panier
  changerQuantite(platId: string, quantite: number): void {
    // Trouve l'élément du panier correspondant à platId
    let cartItem = this.cart.items.find(item => item.plat.id === platId);

    // Si l'élément n'existe pas, ne rien faire
    if (!cartItem) return;

    // Met à jour la quantité et le prix de l'élément
    cartItem.quantite = quantite;
    cartItem.prix = quantite * cartItem.plat.price;
    // Sauvegarde le panier dans le local storage et notifie les abonnés
    this.poserCarAuLocalStorage();
  }

  // Méthode pour obtenir le BehaviorSubject du panier
  obtenirCart(): BehaviorSubject<Cart> {
    return this.cartSubject;
  }

  // Méthode pour vider le panier
  clearCart(): void {
    // Réinitialise le panier à un nouveau panier vide
    this.cart = new Cart(); 
    // Sauvegarde le panier dans le local storage et notifie les abonnés
    this.poserCarAuLocalStorage();
  }

  // Méthode pour obtenir un observable du panier
  obtenirCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  // Méthode privée pour sauvegarder le panier dans le local storage
  private poserCarAuLocalStorage(): void {
    if (this.isLocalStorageAvailable()){
      // Calcule le prix total du panier
      this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.prix, 0);
      // Calcule le nombre total d'articles dans le panier
      this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantite, 0);
      // Convertit le panier en JSON et le sauvegarde dans le local storage
      const cartJson = JSON.stringify(this.cart);
      localStorage.setItem('Cart', cartJson);
    }
    // Informe les abonnés de la mise à jour du panier
    this.cartSubject.next(this.cart);
  }

  // Méthode privée pour obtenir le panier depuis le local storage
  private obtenirCartDuLocalStorage(): Cart {
    if (this.isLocalStorageAvailable()){
      // Récupère le panier en JSON depuis le local storage
      const cartJson = localStorage.getItem('Cart');
      // Parse le JSON ou retourne un nouveau panier vide si aucun panier n'est trouvé
      return cartJson ? JSON.parse(cartJson) : new Cart();
    }
    return new Cart();
  }

  // Méthode privée pour vérifier la disponibilité du local storage
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}
