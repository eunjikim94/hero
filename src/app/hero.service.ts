import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService  {
  private heroesUrl = 'api/heroesd';
  httpOtions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private messageService:MessageService,
    private http:HttpClient ) { }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }

  //hero 목록을 가져오기
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    );
  }


  


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //상세정보
  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=> this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero):Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOtions)
    .pipe(
      tap(_=> this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updatedHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOtions)
    .pipe(
      tap((newHero: Hero)=> this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id: number):Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOtions)
    .pipe(
      tap(_=> this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Hero []>(`${this.heroesUrl}/?name=${term}`)
    .pipe(
      tap(x => x.length ? 
      this.log(`found heroes matching "${term}`) :
      this.log(`no heroes matching "${term}`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  

}
