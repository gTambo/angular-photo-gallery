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
import { Observable, Subscription, catchError, finalize, map, tap, concat, scan, pipe } from 'rxjs';

@Component({
  selector: 'app-file-add',
  templateUrl: './file-add.component.html',
  styleUrls: ['./file-add.component.scss'],
})
export class FileAddComponent implements OnInit, AfterViewInit {
  isImageLoading = false;
  file: File | null = null;
  fileName = '';
  fileType = '';
  newFileName = '';
  photoFile: any = null;
  receivedImageData: any = '';
  photoUrl: any = '';
  photoUrls: any[] = [];
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
    this.fetchAllImageUrls().subscribe((res: any) => {
      for(let item of res){
        this.photoUrls.push(item.url)
      }
      console.log(`the photoUrls: ${this.photoUrls}`);
    });
    this.fetchFileById('556c0b390cf12772d411474b0b4d028d').subscribe(async (fileUrl: any) => {
      this.imageToShow$ = await fileUrl;
      console.log('Image url: ', this.imageToShow$);
      catchError((err) => {console.error(err); return err})
    });
  }

  @ViewChild('fileUpload', { static: true })
  input!: ElementRef;
  ngAfterViewInit(): void {
    console.log('after view init', this.input.nativeElement);
  }

  fetchAllImageUrls(): Observable<any>{
    // this.isImageLoading = true;
    return this.http
    .get<any[]>('http://localhost:9000/alt-api/thumbnail-upload/', {responseType: 'json'})
    .pipe(
      tap(response => console.log(response)),
      // map((response) => {
      //   for(let item of response) {
      //     console.log('url', item.url)
      //   }
      // }),
      catchError(err => {console.log(err); return err})
      );
  }

  fetchFileById(fileName: string): Observable<any> {
    return this.http
      .get('http://localhost:9000/alt-api/thumbnail-upload/' + fileName, {responseType: 'blob'})
      .pipe(
        map((response) => {
          const urlToBlob = window.URL.createObjectURL(response)
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob);
        }),
        catchError(err => {console.error(err); return err}))  
    
  }

  onFileSelected(event: Event) {
    let element = event.currentTarget as HTMLInputElement;
    this.file = element.files![0];

    console.log('selected: ', element.value);
    const reader = new FileReader();
    if (element) {
      reader.readAsDataURL(this.file);
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
      formData.append("photoFile", this.fileName);

      console.log(`form data: ${formData.get('thumbnail')}, and file type: ${this.file.type}, and name: ${formData.get('photoFile')}`);
      const upload$ = this.http.post("http://localhost:9000/alt-api/thumbnail-upload/upload", formData
        // {
        //   reportProgress: true,
        //   observe: 'events'
        // }
      )
      .pipe(
          finalize(() => this.reset())
      );

      this.uploadSub = upload$.subscribe(event => {
        console.log("event.type ", event)
        // if (event.type == HttpEventType.UploadProgress) {
        //   this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
        // }
        // this.photoFiles.push(event)
      })

      this.input.nativeElement.value = '';
    }

  }

  createPhotoUrl = (filesArr: any) => {
    const newArr: (string | ArrayBuffer | null)[] = []
    let currentFile = null;
    for( let file = 0; file < filesArr.length; file++){
      currentFile = new Blob(filesArr[file]['photoFile'].data, {type: 'image/webp'})
    const reader = new FileReader();

    reader.onload = (e: any) => {
      console.log("In 'reader': ", e.target.result);
      const newUrl = reader.result;
      newArr.push(newUrl);
    };

    reader.readAsDataURL(currentFile);
    }
    return newArr;
  };

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
