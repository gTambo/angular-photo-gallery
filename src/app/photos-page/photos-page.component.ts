import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PhotoService } from '../photo.service';

import { Photo } from '../photo';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent {

  // newPhoto: Photo | undefined;

  photos: Photo[] = [];

  // addNewPhotoForm = this.formBuilder.group({
  //   id: 0,
  //   photoUrl: '',
  //   description: ''
  // });

  addNewPhoto: Photo = {
    id: 10,
    url: 'https://www.wildnatureimages.com/images/xl/050612-223-Wolf.jpg',
    description: 'Wolf (Canis Lupus)'
  }

  model = new Photo('', 'https://www.wildnatureimages.com/images/xl/050612-223-Wolf.jpg', 'Wolf (Canis Lupus)');

  constructor(
    // private formBuilder: FormBuilder,
    private photoService: PhotoService,
  ) {}

  saveForm(): void{
    this.photoService.addPhoto(this.model);
    alert('you saved the form');
    this.photos = this.photoService.getPhotos();
  }
}
