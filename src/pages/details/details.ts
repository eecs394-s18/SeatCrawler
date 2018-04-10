import { Component, OnInit } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {Cafe} from "../../app/cafe";


/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage implements OnInit{

  constructor(public navCtrl: NavController, private navParams: NavParams) {
  }
  item: Cafe;
  name: string;
  ngOnInit(){
    this.item = this.navParams.data
  }


  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad DetailsPage');
  // }


}
