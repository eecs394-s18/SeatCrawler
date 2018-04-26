import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
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
  cafe: AngularFireObject<any>;
  destination:string;
  start:string;
  oppeningInfo: string;
  chosenDay: string;
  percent: number;
  applemaps: string;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['', '', '', '9:00', 
  '', '', '12:00','', '', '15:00',
  '', '', '18:00','', '', '21:00','', ''];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [{data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Popular times'}];

  constructor(public navCtrl: NavController, public platform: Platform, private navParams: NavParams, private  adb: AngularFireDatabase, private launchNavigator: LaunchNavigator)
  {
    this.item = this.navParams.data;
    this.start = "";
    var date = new Date();
    var hours = date.getHours();
    var day = date.getDay();
    this.applemaps="http://maps.apple.com/?q="+this.item.address;

    if (this.item.populartimes!=null) {
      // get the data from firebase
      this.item.currentPop = this.item.populartimes[day-1]["data"][hours];
      this.barChartData[0].data = this.item.populartimes[day-1]["data"].slice(6, 24);
      this.barChartData[0].label = 'Popular times in ' + this.item.populartimes[day-1].name;
      this.oppeningInfo = "";
      this.chosenDay = day.toString();
    } else{
      // if the data doesn't exist
      
      this.oppeningInfo = "It closed this day - please pick another day";
      this.item.currentPop = 0;
    }
    this.cafe = adb.object('/cafe_list/' + this.item.number);
  }
  navigate(){
    if (this.platform.is('mobileweb') || this.platform.is('core')) {
      // This will only print when running on desktop
      console.log("I'm a regular browser!");
      window.open(this.applemaps,"_self");
    } else {
      let options: LaunchNavigatorOptions = {
        start: this.start
      };
      this.launchNavigator.navigate(this.item.address, options)
       .then(
        success => alert('Launched navigator'),
        error => alert('Error launching navigator: ' + error)
        );
      }
  }

  updateStatus(color: any) {
    this.item.status = color.status;
    this.cafe.update(color);
  }

  updateDataOfDay():void {
    if(this.item.populartimes!=null){
      // get the data from firebase
      var day = parseInt(this.chosenDay);
      let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = this.item.populartimes[day-1]["data"].slice(6, 24);
      clone[0].label = 'Popular times in ' + this.item.populartimes[day-1].name;
      this.barChartData = clone;
      this.oppeningInfo = "";
    } else{
      // if the data doesn't exist
      this.oppeningInfo = "It closed this day - please pick another day";
    }
  }
}
