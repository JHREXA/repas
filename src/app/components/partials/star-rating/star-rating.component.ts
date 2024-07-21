import { Input, Component } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {

    faStar = faStar;
    @Input() rating: number = 0;
    @Input() readonly: boolean = false;

    setRating(value: number){
        if(this.readonly)
            this.rating = value;
    }
}
