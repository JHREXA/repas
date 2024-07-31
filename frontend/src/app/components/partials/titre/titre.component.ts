import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titre',
  templateUrl: './titre.component.html',
  styleUrl: './titre.component.css'
})
export class TitreComponent {

    @Input() title!: string;
    @Input() margin? = '1rem 0 1rem 0.2rem';
    @Input() fontSize = '1.7rem';
}
