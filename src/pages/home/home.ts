import { Component, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StarWarsService} from '../../services/star-wars-api.service';
import { ISubscription } from 'rxjs/Subscription';

import { map, take } from 'rxjs/operators';
import { Ifilm } from '../../interfaces/IFilm';
import { Ipeople } from '../../interfaces/Ipeople';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, OnDestroy{

  films: Ifilm[] = [];
  countFilms: number = 0;
  next: string;
  previous: string;


  private subscription: ISubscription;

  constructor(
    public navCtrl: NavController,
    private s_startWars: StarWarsService,
    private cd: ChangeDetectorRef
  ) {
      console.log("HomePage constructor");
  }

  ngOnInit() {
    let url = 'https://swapi.co/api/films';
    this.setPage(url);
  }

  nextPage(){
    if (this.next == null) 
      return;
    this.setPage(this.next)
  }

  previousPage(){
    if (this.previous == null)
      return;
    this.setPage(this.previous)
  }

  setPage(url){
    
    let self = this;
    this.subscription = this.s_startWars.getFilms(url).pipe(
    map( (resp) => {
      console.log("HomePage ngOnInit resp: ",resp);
      resp.results.forEach((film, i) => {
        
        let len = film.characters.length;
        let peoples = []
        Promise.resolve(0).then(function loop(j) {
          console.log("HomePage ngOnInit loop j: ",j);
          
          if (j < len) {  
            let urlPeople = film.characters[j];
            return  self.getActors(j, urlPeople, peoples).then(loop);
          }
        }).then( () => {
          console.log("HomePage ngOnInit done i: ", i);
          console.log("HomePage ngOnInit done peoples: ",peoples);
          self.films[i].peoples = peoples
          self.cd.markForCheck();
          
        }).catch( (e) => {
          console.log("PlayingComponent PlayingSuquencer error", e);
        });
        
      });
      console.log("HomePage getCharacterByUrl this.films: ",this.films) 
      //this.cd.markForCheck();
      //console.log("HomePage ngOnInit resp 2: ",resp);
      return resp;
    }))
    .subscribe( resp => {
      console.log("HomePage getCharacterByUrl this.films 2: ",this.films) 
      this.films = resp.results
      this.countFilms = resp.count
      this.next = resp.next
      this.previous = resp.previous
    })

  }

  getActors(j, urlPeople, peoples){

    return new Promise( (resolve, reject) => {
      this.s_startWars.getCharacterByUrl(urlPeople).pipe(take(1),
      map( (char) => {
        console.log("HomePage getCharacterByUrl char: ",char) 
        peoples[j] = char as Ipeople;
        return resolve(j+1)
      })).subscribe()
    })
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
	}

}
