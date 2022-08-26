import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>
  private searchTerms = new Subject<string>();//옵저버블 그자체

  constructor(private heroService:HeroService) { }

  search(term:string): void{
    this.searchTerms.next(term);
  }
  //입력받은거를 바로 옵저버블 스트림 
  ngOnInit(): void {

    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term:string) => this.heroService.searchHeroes(term)),
    );
  }

}
