import { Injectable } from '@angular/core';
import { PhotoUrl } from './photos-page/photos-page.component';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photoUrls: PhotoUrl[] = [];

  constructor() { }

  addUrls(photoUrl: PhotoUrl) {
    this.photoUrls.push(photoUrl);
  }

  getUrls() {
    return this.photoUrls;
  }
}
