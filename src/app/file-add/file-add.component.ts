import { Component, DoCheck, OnInit } from '@angular/core';
import { ImgFile, PhotoFile, PhotoService } from '../photo.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, catchError, finalize, map, tap } from 'rxjs';

@Component({
  selector: 'app-file-add',
  templateUrl: './file-add.component.html',
  styleUrls: ['./file-add.component.scss']
})
export class FileAddComponent implements OnInit {

  fileName = '';
  photoFiles: any[] = [];
  photoUrls: any[] = []
  uploadProgress: number | null = null;
  uploadSub: Subscription | null = null;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  
  constructor( 
    private photoService: PhotoService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchFileById(2).subscribe(file => {
      // const imageUrl = this.createImageFromBlob(file)
      // this.photoUrls.push(imageUrl);
      // console.log("image to show ", this.imageToShow, this.photoUrls);
      this.createPhotoUrl(file);
      console.log("image urls", this.photoUrls);
    }, error => {
      console.error(error);
    });
    // this.createPhotoUrl(this.photoFiles);

  }

  imageToShow: any;

createImageFromBlob(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}

// getImageFromService() {
//   this.isImageLoading = true;
//   this.imageService.getImage(yourImageUrl).subscribe(data => {
//     this.createImageFromBlob(data);
//     this.isImageLoading = false;
//   }, error => {
//     this.isImageLoading = false;
//     console.log(error);
//   });
// }

  // ngDoCheck(): void {
    // for(let i = 0; i < this.photoFiles.length; i++){
    //   let fileUrl = URL.createObjectURL(this.photoFiles[i]['photo-file'])
    //   this.photoUrls.push(fileUrl);
    // }
  // }

  createPhotoUrl = (image: Blob) => {
    
    // let currentFile = null;
    // for( let file = 1; file < filesArr.length; file++){
    //   currentFile = new Blob(filesArr[file]['photo-file'].data, {type: 'image/webp'})
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log("In 'reader': ", e.target.result);
        this.photoUrls.push(e.target.result);
      };

      reader.readAsDataURL(image);
    // }
    
  }

  onFileSelected(event: Event) {

    let element = event.currentTarget as HTMLInputElement
    let file: File | null = element.files![0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);
      // formData.append("id", '102');
      // formData.append("name", file.name);

    //   const upload$ = this.photoService.addPhotoFile(formData as PhotoFile).pipe(
    //     finalize(() => this.reset())
    // );

      // upload$.subscribe(photoFile => this.photoFiles.push(photoFile));

      const upload$ = this.http.post("http://localhost:9000/alt-api/thumbnail-upload", formData, {
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
        // this.photoFiles.push(event)
      })
      
    }
    
    element.value = '';
  }

  fetchFileById(id: number) {
    return this.http.get("http://localhost:9000/alt-api/thumbnail-upload/" + id, { responseType: 'blob' })
      // .pipe(
      //   map(file => new Blob(file['photo-file'])
      //   ),
      //   catchError(err => {console.error(err); return err}))  
    
  }

  getKeyByValue = (object: any, value: any) => {
    return Object.keys(object).find(key => object[key] === value);
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
