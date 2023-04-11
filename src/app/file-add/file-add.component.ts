import { Component } from '@angular/core';
import { PhotoService } from '../photo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-add',
  templateUrl: './file-add.component.html',
  styleUrls: ['./file-add.component.scss']
})
export class FileAddComponent {

  fileName = '';

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

        const upload$ = this.http.post("/api/thumbnail-upload", formData);

        upload$.subscribe();
    }
  }
}
