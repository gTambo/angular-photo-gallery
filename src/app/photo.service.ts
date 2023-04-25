import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Photo } from 'src/app/photo';
import { HttpClient, HttpHeaders, HttpEventType, HttpEvent } from '@angular/common/http';

export interface PhotoFile extends FormData {
  id: number,
  thumbnail: File
}
export type ImgFile = HttpEvent<string> & {
  id: number,
  name: string,
  thumbnail: File
}


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private photosUrl = 'api/photos';
  private filesUrl = 'api/files';

  constructor(
    private http: HttpClient  
  ) { }

  addPhoto(photo: Photo): Observable<Photo> {
  return this.http.post<Photo>(this.photosUrl, photo,  this.httpOptions).pipe(
      tap((newPhoto: Photo) => console.log(`added new photo with id=${newPhoto.id}`)),
      catchError(this.handleError<Photo>('addPhoto'))  
    );
  }

  addPhotoFile(dataFile: PhotoFile) {
    return this.http.post(
      this.filesUrl, { id: dataFile. id, thumbnail: dataFile.thumbnail}, { ...this.httpOptions, reportProgress: true, observe: 'events'
        }
      ).pipe(
      tap((newFile: any) => console.log(`added new file ${newFile.body.id}`)),
      catchError(this.handleError<ImgFile>('addPhotoFile'))
    );
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photosUrl).pipe(
      tap(_ => console.log('Fetched photos')),
      catchError(this.handleError<Photo[]>('getPhotos', []))  
    );
  }

  getPhotoFiles() {
    return this.http.get(this.filesUrl).pipe(
      tap(_ => console.log('Fetched files')),
      catchError(this.handleError('getPhotoFiles', []))
    );
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
