import { Component, OnInit } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {Cafe} from "../../app/cafe";
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

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
   cafes: AngularFireObject<any>;
   destination:string;
   start:string;
   percent: number;



   constructor(public navCtrl: NavController, private navParams: NavParams, private  adb: AngularFireDatabase, private launchNavigator: LaunchNavigator) {
    this.item = this.navParams.data;
    this.start = "";
    // this.percent = this.item.fullness;
    // this.percent = this.adb.list('/cafe_list/').valueChanges();

     // this.destination = this.item.address;
    var date = new Date();
    var hours = date.getHours();
    var day = date.getDay();
    if(this.item.populartimes != null){
          // get the data from firebase
          this.item.currentPop = this.item.populartimes[day-1]["data"][hours];
        } else{
          // if the data doesn't exist
          this.item.currentPop = 0;
        }
        this.cafes = adb.object('/cafe_list/' + this.item.number);
        // this.percent = adb.object('/cafe_list/percent')
        // this.percent = this.cafes.valueChanges()
        // alert(this.percent)
      }
      navigate(){
        let options: LaunchNavigatorOptions = {
          start: this.start
        };
        this.launchNavigator.navigate(this.item.address, options)
        .then(
          success => alert('Launched navigator'),
          error => alert('Error launching navigator: ' + error)
          );
      }


      updateStatus(color: any) {
        this.item.status = color.status;
        this.cafes.update(color);
      }


    }
