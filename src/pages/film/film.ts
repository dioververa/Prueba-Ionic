import { Component, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StarWarsService} from '../../services/star-wars-api.service';
import { ISubscription } from 'rxjs/Subscription';

import { map, take } from 'rxjs/operators';
import { Ifilm } from '../../interfaces/IFilm';
import { Ipeople } from '../../interfaces/Ipeople';

import { ModalController, NavParams } from 'ionic-angular';
import { Actor } from '../actor/actor';

@Component({
  selector: 'film',
  templateUrl: 'film.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class filmComponent implements OnInit, OnDestroy{

  films: Ifilm[] = [];
  countFilms: number = 0;
  next: string;
  previous: string;
  isenabledPrevious:boolean=true;
  isenabledNext:boolean=true;

  private subscription: ISubscription;

  constructor(
    public navCtrl: NavController,
    private s_startWars: StarWarsService,
    private cd: ChangeDetectorRef,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    let url = 'https://swapi.co/api/films';
    this.setPage(url);
  }

  presentActorModal(filmIndex, peopleIndex) {
    let actor = this.films[filmIndex].peoples[peopleIndex];
    let profileModal = this.modalCtrl.create(Actor, { actor: actor });
    profileModal.present();
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
      this.films = resp.results
      self.cd.markForCheck();
      resp.results.forEach((film, i) => {
        
        let len = film.characters.length;
        let peoples = []
        Promise.resolve(0).then(function loop(j) {
          
          if (j < len) {  
            let urlPeople = film.characters[j];
            return  self.getActors(j, urlPeople, peoples).then(loop);
          }
        }).then( () => {
          self.films[i].peoples = peoples
          self.cd.markForCheck();
          
        }).catch( (e) => {
          console.log("PlayingComponent PlayingSuquencer error", e);
        });
        
      });
      return resp;
    }))
    .subscribe( resp => {
      this.countFilms = resp.count
      this.previous = resp.previous
      this.next = resp.next
      this.isenabledPrevious = this.previous == null ? false : true;
      this.isenabledNext = this.next == null ? false : true;

    })

  }

  getActors(j, urlPeople, peoples){

    return new Promise( (resolve, reject) => {
      this.s_startWars.getCharacterByUrl(urlPeople).pipe(take(1),
      map( (char) => {
        peoples[j] = char as Ipeople;
        return resolve(j+1)
      })).subscribe()
    })
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
	}

}


