import { Component } from '@angular/core';
import { Tag } from '../../../shared/models/tag';
import { PlatService } from '../../../services/plat.service/plat.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {

    tags?:Tag[];

    constructor(platService: PlatService){
        this.tags=platService.getAllTags();

    }
}
