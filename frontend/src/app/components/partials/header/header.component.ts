import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartQuantite = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // S'abonner aux changements du panier pour mettre à jour la quantité affichée dans l'en-tête
    this.cartService.obtenirCartObservable().subscribe((newCart: Cart) => {
      this.cartQuantite = newCart.totalCount;
    });
  }
}
