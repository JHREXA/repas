import { Component, OnInit } from '@angular/core';
import { Plat } from '../../../shared/models/Plat';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatService } from '../../../services/plat.service/plat.service';
import { Observable, tap } from 'rxjs';
import { faHeart, faClock } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../../services/cart.service/cart.service';

@Component({
  selector: 'app-plat-page',
  templateUrl: './plat-page.component.html',
  styleUrls: ['./plat-page.component.css']
})
export class PlatPageComponent implements OnInit {
  plat$!: Observable<Plat>;
  faHeart = faHeart;
  faClock = faClock;

  constructor(
    private activatedRoute: ActivatedRoute,
    private platService: PlatService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.plat$ = this.platService.getPlatbyId(params['id']).pipe(
          tap((plat: any) => console.log('Plat data:', plat))
        );
      }
    });
  }
  

  ajouterAuPanier(plat: Plat): void {
    this.cartService.ajouterAuPanier(plat);
    this.router.navigateByUrl('/cart-page'); 
  }
}
