import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Photo } from 'src/app/photo';
import { PHOTOS } from './mock-photos';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {



  photos: Photo[] = [];

  constructor() { }

  addPhoto(photo: Photo): void {
    this.photos.push(photo);
    console.log('current photoUrls: ', this.photos);
  }

  getPhotos(): Observable<Photo[]> {
    const photos = of(PHOTOS)
    return photos;
  }
}
