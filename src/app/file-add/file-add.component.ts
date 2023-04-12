import { Component } from '@angular/core';
import { ImgFile, PhotoFile, PhotoService } from '../photo.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-file-add',
  templateUrl: './file-add.component.html',
  styleUrls: ['./file-add.component.scss']
})
export class FileAddComponent {

  fileName = '';
  photoFiles: any[] = [];
  uploadProgress: number | null = null;
  uploadSub: Subscription | null = null;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  
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
      formData.append("id", '102');

    //   const upload$ = this.photoService.addPhotoFile(formData as PhotoFile).pipe(
    //     finalize(() => this.reset())
    // );

      // upload$.subscribe(photoFile => this.photoFiles.push(photoFile));

      const upload$ = this.http.post("http://localhost:9000/alt-api/thumbnail-upload", formData, { ...this.httpOptions,
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
          finalize(() => this.reset())
      );
    
      this.uploadSub = upload$.subscribe(event => {
        console.log("event.type ", event.type)
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
        }
        this.photoFiles.push(event)
      })
    }
  }
  cancelUpload() {
    this.uploadSub!.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
