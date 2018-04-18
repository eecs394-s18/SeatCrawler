import { Component, OnInit } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {Cafe} from "../../app/cafe";
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {


    item: Cafe;
    name: string;
    temp: AngularFireObject<any>;

    constructor(public navCtrl: NavController, private navParams: NavParams, private  adb: AngularFireDatabase) {
        this.item = this.navParams.data;
        var date = new Date();
        var hours = date.getHours();
        var day = date.getDay();
        if(this.item.populartimes!=null){
          this.item.currentPop = this.item.populartimes[day-1]["data"][hours];
        }else{
          this.item.currentPop = 0;
        }
        this.temp = adb.object('/cafe_list/' + this.item.number);
    }


    updateStatus(color: any) {
      this.item.status = color.status;
      this.temp.update(color);
    }
}
