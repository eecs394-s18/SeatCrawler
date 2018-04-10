import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  items = [
      {name: 'Einstein\s Bagels',
        distance: '0.1',
        status: 'red',
        shape: 'radio-button-on'},
      {name: 'Cafe Bergson',
        distance: '0.4',
        status: 'orange',
        shape: 'radio-button-on'},
      {name: 'Norbucks',
        distance: '0.4',
        status: 'green',
        shape: 'radio-button-on'},
      {name: 'Sherbucks',
        distance: '1.0',
        status: 'red',
        shape: 'radio-button-on'},
      {name: 'Kafein',
       distance: '1.0',
       status: 'red',
       shape: 'radio-button-on',},
      {name: 'Unicorn',
        distance: '1.1',
        status: 'green',
        shape: 'radio-button-on'},
      {name: 'Cupitol',
        distance: '1.2',
        status: 'orange',
        shape: 'radio-button-on'},
      {name: 'Peet\'s Coffee',
        distance: '1.3',
        status: 'green',
        shape: 'radio-button-on'},
  ];

}
