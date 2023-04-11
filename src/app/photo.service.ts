import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Photo } from 'src/app/photo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private photosUrl = 'api/photos';
  private filesUrl = 'api/files';

  constructor(
    private http: HttpClient  
  ) { }

  addPhoto(photo: Photo): Observable<Photo> {
    return this.http.post<Photo>(this.photosUrl, photo, this.httpOptions).pipe(
      tap((newPhoto: Photo) => console.log(`added new photo with id=${newPhoto.id}`)),
      catchError(this.handleError<Photo>('addPhoto'))  
    );
  }

  addPhotoFile(dataFile: { thumbnail: File }): Observable<File> {
    return this.http.post<File>(this.filesUrl, dataFile.thumbnail, this.httpOptions).pipe(
      tap((newFile: File) => console.log(`added new file ${newFile}`)),
      catchError(this.handleError<File>('addPhotoFile'))
    );
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photosUrl).pipe(
      tap(_ => console.log('Fetched photos')),
      catchError(this.handleError<Photo[]>('getPhotos', []))  
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
