import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

type PhotoUrl = '' | undefined;

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent {

  newPhotoUrl: PhotoUrl;

  addNewPhotoForm = this.formBuilder.group({
    id: 0,
    photoUrl: '',
    description: ''
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  saveForm(): void{
    alert('you saved the form');
  }
}
