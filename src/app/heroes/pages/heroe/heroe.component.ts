import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { HeroesService } from '../../services/heroes.service';

import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  @Input()
  id!: string;

  constructor( 
      private activatedRoute: ActivatedRoute, 
      private heroesService: HeroesService ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe (
        switchMap( (param) => this.heroesService.getHeroePorId(param.id) )
      )
      .subscribe( heroe => { this.heroe = heroe }
      )
  }

}
