import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  map,
  Observable,
  of,
  Subscription,
  tap,
  throwError,
} from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Models
import {
  SentencesResponse,
  Type,
  TypesResponse,
  WordsResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class SentenceBuilderService {
  private types: Type[] = [];
  private words: Record<number, string[]> = {};
  private sentences: string[] = [];

  constructor(private http: HttpClient) {}

  public getTypes(): Observable<Type[]> {
    if (this.types.length > 0) {
      return of(this.types);
    }

    return this.http.get<TypesResponse>(`${environment.apiUrl}/types`).pipe(
      tap(({ types }) => {
        if (types) {
          this.types = types;
        }
      }),
      map(({ types }) => types),
      catchError(this.handleErrors)
    );
  }

  public getTypeWords(typeId: number): Observable<string[]> {
    if (this.words && this.words[typeId] && this.words[typeId].length > 0) {
      return of(this.words[typeId]);
    }

    return this.http
      .get<WordsResponse>(`${environment.apiUrl}/types/${typeId}/words`)
      .pipe(
        tap(({ words }) => {
          if (words) {
            this.words[typeId] = [...words];
          }
        }),
        map(({ words }) => words),
        catchError(this.handleErrors)
      );
  }

  public getSentences(): Observable<string[]> {
    if (this.sentences.length > 0) {
      return of(this.sentences);
    }

    return this.http
      .get<SentencesResponse>(`${environment.apiUrl}/sentences`)
      .pipe(
        tap(({ sentences }) => {
          if (sentences) {
            this.sentences = [...sentences];
          }
        }),
        map(({ sentences }) => sentences),
        catchError(this.handleErrors)
      );
  }

  public saveSentence(sentence: string): Observable<unknown> {
    let sub: Subscription;
    sub = this.getSentences().subscribe((sentences) => {
      this.sentences = [sentence, ...(sentences ? sentences : [])];
      if (sub) {
        sub.unsubscribe();
      }
    });
    return this.http.post(`${environment.apiUrl}/sentences`, { sentence });
  }

  private handleErrors(err: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(err.message));
  }
}
