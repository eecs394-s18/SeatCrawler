import { Component, OnInit } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {Cafe} from "../../app/cafe";
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

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
    temp: FirebaseObjectObservable<any>;

    constructor(public navCtrl: NavController, private navParams: NavParams, private  adb: AngularFireDatabase) {
        this.item = this.navParams.data;
        this.temp = adb.object('/cafe_list/' + this.item.number);
        this.temp.subscribe(action => {
            console.log(action)
        });
    }

    updateStatus(color: any) {
    this.temp.update(color);

    }
}