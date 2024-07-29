import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit{

    @Input() isVisible = false;
    @Input() pasTrouveMessage = "Rien trouvé";
    @Input() resetLienMessage = "Revenez à la page d'accueil";
    @Input() resetLienRoute: string = "/";

    constructor() {}

    ngOnInit(): void {
    }
    
}
