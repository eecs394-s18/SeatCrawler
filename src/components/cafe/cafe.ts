import { Component } from '@angular/core';

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
export class CafeComponent {

  text: string;

  constructor() {
    console.log('Hello CafeComponent Component');
    this.text = 'Hello World';
  }

}
