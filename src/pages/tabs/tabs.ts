import { Component } from '@angular/core';

import { filmComponent } from '../film/film';
import { VehicleComponent } from '../vehicle/vehicle';
import { StarShipComponent } from '../star-ship/star-ship';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = filmComponent;
  tab2Root = VehicleComponent;
  tab3Root = StarShipComponent;

  constructor() {

  }
}
