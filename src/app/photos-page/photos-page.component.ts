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
  // public gen = idMaker();

  model = new Photo(this.newId, 'https://www.wildnatureimages.com/images/xl/050612-223-Wolf.jpg', '', 'Wolf (Canis Lupus)');

  constructor(
    private photoService: PhotoService,
  ) {}

  ngOnInit(): void {
    this.getPhotos();
    // this.newId = this.photos.length + 1;
  }

  getPhotos(): void {
    this.photoService.getPhotos()
      .subscribe(photos => this.photos = photos);
  }

  saveForm(): void{
    console.log(`Adding photo with id=${this.model.id} and url=${this.model.url}`);
    this.photoService.addPhoto(this.model)
      .subscribe(photo => this.photos.push(photo));
    // alert('you saved the form');
    // this.getPhotos();
  }
}

function* idMaker() {
  let index = 3;
  while (true) {
    yield index++;
  }
}

