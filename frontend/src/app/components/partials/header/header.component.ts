import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service'; 
import { UserService } from '../../../services/user.service'; 
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartQuantite = 0;
  user!: User;

  constructor(private cartService: CartService,
              private userService: UserService
  ) {}

  ngOnInit() {
    // S'abonner aux changements du panier pour mettre à jour la quantité affichée dans l'en-tête
    this.cartService.obtenirCartObservable().subscribe((newCart: Cart) => {
      this.cartQuantite = newCart.totalCount;
    });

    this.userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
    })
  }

  logout(){
    this.userService.logout();
  }

  isAuth(){
    return this.user.token;
  }
}
