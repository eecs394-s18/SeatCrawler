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
      {name: 'Kafein',
       distance: '0.1',
       status: 'red',
       shape: 'radio-button-on',},
      {name: 'Peet\'s Coffee',
          distance: '0.1',
          status: 'green',
          shape: 'radio-button-on'},
      {name: 'Unicorn',
          distance: '0.2',
          status: 'green',
          shape: 'radio-button-on'},
      {name: 'Cupitol',
          distance: '0.5',
          status: 'orange',
          shape: 'radio-button-on'},
      {name: 'Sherbucks',
          distance: '0.8',
          status: 'red',
          shape: 'radio-button-on'},
      {name: 'Norbucks',
          distance: '1.2',
          status: 'green',
          shape: 'radio-button-on'},
      {name: 'Cafe Bergson',
          distance: '1.7',
          status: 'orange',
          shape: 'radio-button-on'},
      {name: 'Einstein\s Bagels',
          distance: '2.4',
          status: 'red',
          shape: 'radio-button-on'},

  ];

}
