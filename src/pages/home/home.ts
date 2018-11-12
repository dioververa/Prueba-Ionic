import { Component, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StarWarsService, Ifilm, Ipeople } from '../../services/star-wars-api.service';
import { ISubscription } from 'rxjs/Subscription';

import { map, take } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, OnDestroy{

  films: Ifilm[] = [];
  actors: { [id: string]: {peoples: Ipeople[]} };

  private subscription: ISubscription;

  constructor(
    public navCtrl: NavController,
    private s_startWars: StarWarsService,
    private cd: ChangeDetectorRef
  ) {
      console.log("HomePage constructor");
  }

  ngOnInit() {

    let self = this;
    this.subscription = this.s_startWars.getFilms(1).pipe(
    map( (resp) => {
      console.log("HomePage ngOnInit resp: ",resp);
      resp.results.forEach((film, i) => {
        film.characters.map( async (character)=> {
          return await this.s_startWars.getCharacterByUrl(character).pipe(take(1),
          map( (char, j)=> {
            console.log("HomePage getCharacterByUrl char: ",char) 
            console.log("HomePage getCharacterByUrl i: ",i) 
            console.log("HomePage getCharacterByUrl j: ",j) 
            self.actors[i].peoples[j] = char as Ipeople;
          })).subscribe()
        })
      });
      this.cd.markForCheck();
      console.log("HomePage ngOnInit resp 2: ",resp);
      return resp.results;
    }))
    .subscribe( films => this.films = films)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
	}

}
