import { Component } from '@angular/core';
import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app works!';
  heroes: Hero[];

  selectedHero: Hero;

  constructor(private heroService: HeroService) { 
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  private onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}


