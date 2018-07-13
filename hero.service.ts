import { Injectable } from '@angular/core';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({ providedIn: "root" })
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }
  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}