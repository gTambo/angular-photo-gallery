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

  photoUrls: PhotoUrl[] = [];

  addNewPhotoForm = this.formBuilder.group({
    id: 0,
    photoUrl: '',
    description: ''
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  saveForm(formObject: typeof this.addNewPhotoForm): void{
    // this.photoUrls.push(formObject.photoUrl);
    alert('you saved the form');
  }
}
