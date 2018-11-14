import { Component, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StarWarsService} from '../../services/star-wars-api.service';
import { ISubscription } from 'rxjs/Subscription';

import { map } from 'rxjs/operators';
import { Ivehicle } from '../../interfaces/IVehicle';

@Component({
  selector: 'vehicle',
  templateUrl: 'vehicle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleComponent implements OnInit, OnDestroy {

  vehicles: Ivehicle[] = [];
  countVehicles: number = 0;
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
    let url = 'https://swapi.co/api/vehicles';
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
    this.subscription = this.s_startWars.getVehicles(url).pipe(
    map( (resp) => {
      return resp;
    }))
    .subscribe( resp => {
      this.vehicles = resp.results
      this.countVehicles = resp.count
      this.next = resp.next
      this.previous = resp.previous
      this.isenabledPrevious = this.previous == null ? false : true
      this.isenabledNext = this.next == null ? false : true
      self.cd.markForCheck();
    })

  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
	}

}
