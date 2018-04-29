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
  public barChartData: any[] = [{data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Popular times graph'}];

  constructor(public navCtrl: NavController, public platform: Platform, private navParams: NavParams, private  adb: AngularFireDatabase, private launchNavigator: LaunchNavigator)
  {
    this.item = this.navParams.data;
    this.start = "";
    var date = new Date();
    var hours = date.getHours();
    var day = date.getDay();
    this.applemaps="http://maps.apple.com/?q="+this.item.address;
    //kind of inefficient, but i couldnt call the function changeGradient here for some reason
    if (this.item.busyness[0][1]/100 <= 0.3){
      this.item.color = "secondary";
    }
    else if(this.item.busyness[0][1]/100 <= 0.6){
      this.item.color = "orange"
    }
    else {
      this.item.color = "danger";
    }

    if (this.item.populartimes!=null) {
      // get the data from firebase
      this.item.currentPop = this.item.populartimes[day-1]["data"][hours];
      this.barChartData[0].data = this.item.populartimes[day-1]["data"].slice(6, 24);
      this.barChartData[0].label = 'Estimated Current Popularity on ' + this.item.populartimes[day-1].name;
      this.oppeningInfo = "";
      this.chosenDay = day.toString();
    } else{
      // if the data doesn't exist, we assume the cafe is closed
      this.oppeningInfo = "It closes this day. Please pick another day!";
      this.item.currentPop = 0;
    }
    this.cafe = adb.object('/cafe_list/' + this.item.place_id);
    console.log(this.item);
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
    // update colored button if user changes color status
    this.item.status = color.status;
    this.cafe.update(color);
  }

  changeGradient(ratio: any, timestamp: any){
    if (ratio <= 0.3){
      this.item.color = "secondary";
    }
    else if(ratio <= 0.6){
      this.item.color = "orange"
    }
    else {
      this.item.color = "danger";
    }
    var busyness = {'busyness': {'0': [timestamp, ratio*100] }}
    this.cafe.update(busyness)
  }

  updateDataOfDay():void {
    if(this.item.populartimes!=null){
      // if the data exists in firebase, get them from firebase and parse popular times info
      var day = parseInt(this.chosenDay);
      let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = this.item.populartimes[day-1]["data"].slice(6, 24);
      clone[0].label = 'Popular times in ' + this.item.populartimes[day-1].name;
      this.barChartData = clone;
      this.oppeningInfo = "";
    } else{
      // if the data doesn't exist, we assume the cafe is closed
      this.oppeningInfo = "It closes this day. Please pick another day!";
    }
  }
}
