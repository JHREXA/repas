import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plat } from '../../../shared/models/Plat';
import { PlatService } from '../../../services/plat.service'; 
import { faHeart, faClock } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    plats: Plat[] = [];
    faHeart = faHeart;
    faClock = faClock;
    errorHttp = false;
    private subscription: Subscription = new Subscription(); // Initialisation de la variable subscription
    
    constructor(private platService: PlatService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.subscription.add(
            this.activatedRoute.params.subscribe(params => {
                let platsObservable;

                if (params['searchTerm']) {
                    platsObservable = this.platService.getAllPlatsbySearchTerm(params['searchTerm']);
                } else if (params['tag']) {
                    platsObservable = this.platService.getAllPlatsbyTag(params['tag']);
                } else {
                    platsObservable = this.platService.getAll();
                }

                this.subscription.add(
                    platsObservable.subscribe({
                        next: (plats) => {
                            this.plats = plats;
                            this.errorHttp = false;
                        },
                        error: (error) => {
                            console.error('Error fetching plats:', error);
                            this.errorHttp = true;
                        }
                    })
                );
            })
        );
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
