import { Injectable } from '@angular/core';
import { Photo } from 'src/app/photo';
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

  getPhotos(): Photo[] {
    return this.photos;
  }
}
