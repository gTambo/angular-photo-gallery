import { Component } from '@angular/core';
import { ImgFile, PhotoFile, PhotoService } from '../photo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-add',
  templateUrl: './file-add.component.html',
  styleUrls: ['./file-add.component.scss']
})
export class FileAddComponent {

  fileName = '';
  photoFiles: ImgFile[] = [];

  constructor( 
    private photoService: PhotoService,
    private http: HttpClient
  ) {}

  onFileSelected(event: Event) {

    const element = event.currentTarget as HTMLInputElement
    let file: File | null = element.files![0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);
        formData.append("id", '2');

        const upload$ = this.photoService.addPhotoFile(formData as PhotoFile)

        upload$.subscribe(photoFile => this.photoFiles.push(photoFile));
    }
  }
}
