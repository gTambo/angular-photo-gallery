import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent {

  addNewPhotoForm = this.formBuilder.group({
    id: 0,
    photoUrl: '',
    description: ''
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

}
