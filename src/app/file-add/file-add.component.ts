import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImgFile, PhotoFile, PhotoService } from '../photo.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, catchError, finalize, map, tap, concat } from 'rxjs';

@Component({
  selector: 'app-file-add',
  templateUrl: './file-add.component.html',
  styleUrls: ['./file-add.component.scss'],
})
export class FileAddComponent implements OnInit, AfterViewInit {
  file: File | null = null;
  fileName = '';
  fileType = '';
  newFileName = '';
  photoFile: any = null;
  receivedImageData: Blob| string | null = '';
  photoUrl: any = '';
  uploadProgress: number | null = null;
  uploadSub: Subscription | null = null;
  imageToShow$: any;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private photoService: PhotoService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.fetchFileById(1).subscribe((file: any) => {
      this.photoFile = file.photoFile;
      // const urlToBlob = window.URL.createObjectURL(this.photoFile);
      // this.photoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob);
      // const newPhoto = new Blob(this.photoFile, { type: this.fileType })
      
      this.receivedImageData = this.photoFile;
      this.createPhotoUrl(this.receivedImageData as Blob);
      this.fileType = file.type;
      this.newFileName = file.name;
      // this.imageToShow$ = `data:${this.fileType};base64,${this.receivedImageData}`;
      console.log('Image: stuff', this.photoFile, `Image Data = ${this.receivedImageData}, image type = ${this.fileType}, name = ${this.newFileName}, URL: ${this.imageToShow$}`); 
      catchError((err) => {console.error(err); return err})
    });
    // this.imageToShow$ = this.sanitizer.bypassSecurityTrustResourceUrl(this.photoUrls[0]);
    // console.log('Image to show ', this.imageToShow$);
    // this.createPhotoUrl(this.photoFiles);
  }

  @ViewChild('fileUpload', { static: true })
  input!: ElementRef;
  ngAfterViewInit(): void {
    console.log('after view init', this.input.nativeElement);
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow$ = reader.result;
      },
      false
    );

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

  ngDoCheck(): void {
    // this.imageToShow$ = this.sanitizer.bypassSecurityTrustResourceUrl(this.photoUrls[0]);
    // console.log('Image to show ', this.imageToShow$);
    // for(let i = 0; i < this.photoFiles.length; i++){
    //   let fileUrl = URL.createObjectURL(this.photoFiles[i]['photo-file'])
    //   this.photoUrls.push(fileUrl);
    // }
  }

  createPhotoUrl = (image: Blob) => {
    // let currentFile = null;
    // for( let file = 1; file < filesArr.length; file++){
    //   currentFile = new Blob(filesArr[file]['photo-file'].data, {type: 'image/webp'})
    const reader = new FileReader();

    reader.onload = (e: any) => {
      console.log("In 'reader': ", e.target.result);
      this.imageToShow$ = e.target.result;
    };

    reader.readAsDataURL(image);
    // }
  };

  onFileSelected(event: Event) {
    let element = event.currentTarget as HTMLInputElement;
    this.file = element.files![0];

    console.log('selected: ', element.value);
    const reader = new FileReader();
    if (element) {
      reader.readAsDataURL(element.files![0]);
    }
    reader.onload = (e: any) => {
      console.log("In 'reader': ", e.target.result);
      this.photoUrl = reader.result;
    };
  }

  onUploadFile() {
    console.log("file selected", this.input.nativeElement.value);

    if (this.file) {

      this.fileName = this.file.name;

      const formData = new FormData();

      formData.append("thumbnail", this.file);

      console.log(`form data: ${formData.get('thumbnail')}, and file type: ${this.file.type}`);
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
    this.input.nativeElement.value = '';

  }

  fetchFileById(id: number): Observable<any> {
    return this.http
      .get('http://localhost:9000/alt-api/thumbnail-upload/' + id, {responseType: 'json'})
      // .pipe(
      //   map((response) => {
      //     const urlToBlob = URL.createObjectURL(response)
      //     return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob);
      //   }),
      //   catchError(err => {console.error(err); return err}))  
    
  }

  getKeyByValue = (object: any, value: any) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  cancelUpload() {
    this.uploadSub!.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
