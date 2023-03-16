import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PhotoService } from '../photo.service';

export type PhotoUrl = '' | undefined;

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent {

  newPhotoUrl: PhotoUrl;

  photoUrls: string[] = [];

  // addNewPhotoForm = this.formBuilder.group({
  //   id: 0,
  //   photoUrl: '',
  //   description: ''
  // });

  addNewPhoto = {
    url: '',
    description: ''
  }

  model = this.addNewPhoto;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
  ) {}

  saveForm(): void{
    this.photoService.addUrls(this.model.url);
    alert('you saved the form');
    this.photoUrls = this.photoService.getUrls();
  }
}
