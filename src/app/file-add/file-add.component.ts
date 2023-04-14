import { Component, DoCheck, OnInit } from '@angular/core';
import { ImgFile, PhotoFile, PhotoService } from '../photo.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, catchError, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-file-add',
  templateUrl: './file-add.component.html',
  styleUrls: ['./file-add.component.scss']
})
export class FileAddComponent implements OnInit, DoCheck {

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
    this.fetchFiles();
    this.createPhotoUrl(this.photoFiles);

  }

  ngDoCheck(): void {
    // for(let i = 0; i < this.photoFiles.length; i++){
    //   let fileUrl = URL.createObjectURL(this.photoFiles[i]['photo-file'])
    //   this.photoUrls.push(fileUrl);
    // }
  }

  createPhotoUrl = (filesArr: any[]) => {
    
    let currentFile = null;
    for( let file = 1; file < filesArr.length; file++){
      currentFile = new Blob(filesArr[file]['photo-file'].data)
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.photoUrls.push(e.target.result);
      };

      reader.readAsDataURL(currentFile);
    }
    
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

  fetchFiles() {
    return this.http.get("http://localhost:9000/alt-api/thumbnail-upload")
      .pipe(
        tap(files => {
        let names: any = this.getKeyByValue(files,'photo-file');
        let keys = Object.entries(files);
        // for(let file of files) {
          console.log(`Files: ${JSON.stringify(files)}`);
        // }
        }),
        catchError(err => {console.error(err); return err}))  
    .subscribe(files => {
        this.photoFiles = (files as any[]);
        console.log(this.photoFiles)
        this.createPhotoUrl(files as any[]);
      })
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
