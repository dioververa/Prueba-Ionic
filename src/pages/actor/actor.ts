import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import { Ipeople } from '../../interfaces/Ipeople';

@Component({
    templateUrl: 'actor.html'
})
export class Actor {

    actor: Ipeople = {} as Ipeople;
    constructor(params: NavParams) {
        this.actor = params.get('actor');
    }

}