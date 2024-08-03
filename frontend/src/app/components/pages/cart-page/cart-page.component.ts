import { Component } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service'; 
import { CartItem } from '../../../shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

    cart!: Cart;

    constructor(private cartService: CartService){
        this.cartService.obtenirCartObservable().subscribe((cart) => {
            this.cart = cart;
        });
    }

    enleverDuPanier(cartItem: CartItem):void{
        this.cartService.enleverDuPanier(cartItem.plat.id);
    }

    changerQuantite(cartItem:CartItem, quantiteInString: string){
        const quantite = parseInt(quantiteInString);
        this.cartService.changerQuantite(cartItem.plat.id, quantite);
    }
}
