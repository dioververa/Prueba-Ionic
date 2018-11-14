import { Component, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StarWarsService} from '../../services/star-wars-api.service';
import { ISubscription } from 'rxjs/Subscription';

import { map, take } from 'rxjs/operators';
import { Istarship } from '../../interfaces/IStarShip';

@Component({
  selector: 'star-ship',
  templateUrl: 'star-ship.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarShipComponent implements OnInit, OnDestroy {

  starShips: Istarship[] = [];
  countStarShips: number = 0;
  next: string;
  previous: string;
  isenabledPrevious:boolean=true;
  isenabledNext:boolean=true;

  private subscription: ISubscription;

  constructor(
    public navCtrl: NavController,
    private s_startWars: StarWarsService,
    private cd: ChangeDetectorRef
  ) {}

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
      return resp;
    }))
    .subscribe( resp => {
      this.starShips = resp.results
      this.countStarShips = resp.count
      this.next = resp.next
      this.previous = resp.previous
      this.isenabledPrevious = this.previous == null ? false : true;
      this.isenabledNext = this.next == null ? false : true;
      self.cd.markForCheck();
    })

  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
	}

}
