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
  private newId = undefined as unknown as number;

  addNewPhoto: Photo = {
    id: this.newId,
    url: '',
    description: ''
  }

  model = new Photo(this.newId, 'https://www.wildnatureimages.com/images/xl/080607-178-Great-Horned-Owl-nest.jpg', '', 'Great Horned Owl Nest');

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
    this.photoService.addPhoto(this.model)
      .subscribe(photo => this.photos.push(photo));
  }
}
