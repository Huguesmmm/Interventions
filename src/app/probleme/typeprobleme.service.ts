import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ITypeProbleme } from './typeprobleme';

@Injectable({
  providedIn: 'root'
})
export class TypeproblemeService {
  private URLDonnees = 'https://localhost:5001/Intervention';

  constructor(private http: HttpClient) { }

  obtenirTypeProbleme(): Observable<ITypeProbleme[]> {
    return this.http.get<ITypeProbleme[]>(this.URLDonnees).pipe(
      tap(data => console.log('obtenirTypeProblemes: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response bodu may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
