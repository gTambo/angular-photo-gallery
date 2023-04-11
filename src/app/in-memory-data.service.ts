import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Photo } from './photo';
import { PhotoFile, ImgFile } from './photo.service';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const photos = [
      {
        id: 1,
        url: '/assets/photos/Ansel-Adams-Denali-and-Wonder-Lake.webp',
        description: 'Denali and Wonder Lake'
      },
      {
        id: 2,
        url: 'https://www.wildnatureimages.com/images/xl/050612-223-Wolf.jpg',
        description: 'Wolf (Canis Lupus)'
      },{
        id: 3,
        url: 'https://www.wildnatureimages.com/images/xl/080914-132-Grizzly-Bear.jpg',
        description: 'Grizzly Bear'
      }
    ];
    const files = [{ id: 1, thumbnail: '/sample.jpg'}];
    return {photos, files };
  }
  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(photos: Photo[] | ImgFile[]): number {
    return photos.length > 0 ? Math.max(...photos.map(photo => photo.id)) + 1 : 11;
  }
}
