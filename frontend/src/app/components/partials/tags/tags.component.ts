import { Component } from '@angular/core';
import { Tag } from '../../../shared/models/Tag';
import { PlatService } from '../../../services/plat.service/plat.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {

    tags?:Tag[];

    constructor(platService: PlatService){
        platService.getAllTags().subscribe(serverTags => {
            this.tags = serverTags;
        });

    }
}
