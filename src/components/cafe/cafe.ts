import { Component } from '@angular/core';
import { Cafe } from '../../app/cafe';
import { CAFES } from '../../app/mock-cafes'

/**
 * Generated class for the CafeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cafe',
  templateUrl: 'cafe.html'
})
export class CafeComponent implements OnInit{

  cafes = CAFES;

  selectedCafe: Cafe;

  constructor() {
    console.log('Hello CafeComponent Component');
    this.text = 'Hello World';
  }

}
