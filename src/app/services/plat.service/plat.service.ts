import { Injectable } from '@angular/core';
import { Plat } from '../../shared/models/plat';
import { sample_plat, sample_tags } from '../../../data';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag } from '../../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class PlatService {

  constructor() { }

  getAll(): Observable<Plat[]> {
    return of(sample_plat);
  }

  getAllPlatsbySearchTerm(searchTerm: string): Observable<Plat[]> {
    return this.getAll().pipe(
      map(plats => plats.filter(plat =>
        plat.name.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  }

  getAllTags(): Tag[]{
    return sample_tags;
  }

  getAllPlatsbyTag(tag: string): Observable<Plat[]> {
    if (tag === 'All') {
      return this.getAll();
    } else {
      return this.getAll().pipe(
        map(plats => plats.filter(plat => plat.tags?.includes(tag)))
      );
    }
  }
}

