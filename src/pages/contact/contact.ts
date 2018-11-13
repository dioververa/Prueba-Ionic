import { Component, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StarWarsService} from '../../services/star-wars-api.service';
import { ISubscription } from 'rxjs/Subscription';

import { map, take } from 'rxjs/operators';
import { Istarship } from '../../interfaces/IStarShip';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage implements OnInit, OnDestroy {

  starShips: Istarship[] = [];
  countStarShips: number = 0;
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
    let url = 'https://swapi.co/api/starships';
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
    this.subscription = this.s_startWars.getStarships(url).pipe(
    map( (resp) => {
      console.log("HomePage ngOnInit resp: ",resp);
      return resp;
    }))
    .subscribe( resp => {
      this.starShips = resp.results
      this.countStarShips = resp.count
      this.next = resp.next
      this.previous = resp.previous
      self.cd.markForCheck();
      console.log("HomePage getCharacterByUrl this.films 2: ",this.starShips) 
    })

  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
	}

}
