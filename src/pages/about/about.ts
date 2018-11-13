import { Component, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StarWarsService} from '../../services/star-wars-api.service';
import { ISubscription } from 'rxjs/Subscription';

import { map } from 'rxjs/operators';
import { Ivehicle } from '../../interfaces/IVehicle';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage implements OnInit, OnDestroy {

  vehicles: Ivehicle[] = [];
  countVehicles: number = 0;
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
      console.log("HomePage ngOnInit resp: ",resp);
      return resp;
    }))
    .subscribe( resp => {
      this.vehicles = resp.results
      this.countVehicles = resp.count
      this.next = resp.next
      this.previous = resp.previous
      self.cd.markForCheck();
      console.log("HomePage getCharacterByUrl this.films 2: ",this.vehicles) 
    })

  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
	}

}
