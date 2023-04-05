import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';

import { Photo } from '../photo';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent implements OnInit {

  photos: Photo[] = [];

  addNewPhoto: Photo = {
    id: 10,
    url: 'https://www.wildnatureimages.com/images/xl/050612-223-Wolf.jpg',
    description: 'Wolf (Canis Lupus)'
  }

  model = new Photo('', 'https://www.wildnatureimages.com/images/xl/050612-223-Wolf.jpg', '', 'Wolf (Canis Lupus)');

  constructor(
    private photoService: PhotoService,
  ) {}

  ngOnInit(): void {
    this.getPhotos();
  }

  getPhotos(): void {
    this.photoService.getPhotos()
      .subscribe(photos => this.photos = photos);
  }

  saveForm(): void{
    this.photoService.addPhoto(this.model);
    alert('you saved the form');
    this.getPhotos();
  }
}
