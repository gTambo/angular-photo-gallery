import { Injectable } from '@angular/core';
import { Photo } from 'src/app/photo';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {



  photos: Photo[] = [];

  constructor() { }

  addPhoto(photo: Photo) {
    this.photos.push(photo);
    console.log('current photoUrls: ', this.photos);
  }

  getPhotos() {
    return this.photos;
  }
}
