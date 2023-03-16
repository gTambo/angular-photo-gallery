import { Injectable } from '@angular/core';
import { PhotoUrl } from './photos-page/photos-page.component';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photoUrls: string[] = [];

  constructor() { }

  addUrls(photoUrl: string) {
    this.photoUrls.push(photoUrl);
    console.log('current photoUrls: ', this.photoUrls);
  }

  getUrls() {
    return this.photoUrls;
  }
}
