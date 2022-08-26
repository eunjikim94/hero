import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  // heroes =  HEROES;
  heroes: Hero[] = [];
  // selectedHero? : Hero;



  constructor(private heroServcie:HeroService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero : Hero): void{
  //   this.selectedHero = hero;
  //   console.log(this.selectedHero);
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }


  //동기방식과 비동기방식


  // getHeroes(): void{
  //   this.heroes = this.heroServcie.getHeroes();
  // }

  getHeroes(): void{
    this.heroServcie.getHeroes().subscribe(heroes=> this.heroes = heroes);
  }

  add(name:string): void{
    name = name.trim();
    if(!name){ return;}
    this.heroServcie.addHero({name} as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    })
  }

  delete(hero: Hero):void{
    this.heroes = this.heroes.filter(h=> h !== hero);
    this.heroServcie.deleteHero(hero.id).subscribe();
  }
}
