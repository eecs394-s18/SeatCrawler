import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController} from 'ionic-angular';
import { Cafe} from "../../app/cafe";
import { AngularFireDatabase,AngularFireObject} from 'angularfire2/database';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { timeInterval} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

// import { ChartsModule } from 'ng2-Chargs'; // are we going to import the charts?


// import * as ColorMath from "color-math"
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
  item: Cafe;//here the type of item has some non-consistency with 'Cafe'!!!!!!!!!!! Need to be revised
  name: string;
  cafe: AngularFireObject<any>;
  destination: string;
  start: string;
  oppeningInfo: string;
  chosenDay: string;
  applemaps: string;
  current_percent: number;
  slider_percent: number;

  tabBarElement: any;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['', '', '', '9:00',
    '', '', '12:00', '', '', '15:00',
    '', '', '18:00', '', '', '21:00', '', ''];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [{
    backgroundColor: "blue",
    borderColor: "blue",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    label: 'Historical Popularity'
  }];


  constructor(public navCtrl: NavController, public platform: Platform, private navParams: NavParams, private  adb: AngularFireDatabase, private launchNavigator: LaunchNavigator, private alertCtrl: AlertController)
  {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.item = this.navParams.data;
    this.start = "";
    var date = new Date();
    var hours = date.getHours();
    var day = date.getDay();
    const current_percent = this.adb.object('/cafe_list/' + this.item["id"] + '/busyness/0/1');

    if (day === 0) { // the day is sunday
      day = 7
    }
    this.applemaps = "http://maps.apple.com/?q=" + this.item.address;

    if (this.item.populartimes != null) {
      // get the data from Firebase
      this.item.currentPop = this.item.populartimes[day - 1]["data"][hours];
      if (this.item.currentPop === 0) {
        // populartimes is 0
        this.oppeningInfo = "Cafe was closed!";
      } else {
        this.oppeningInfo = "";
      }
      this.barChartData[0].data = this.item.populartimes[day - 1]["data"].slice(6, 24);
      this.barChartData[0].label = 'Estimated Popularity on ' + this.item.populartimes[day - 1].name;
      this.barChartData[0].backgroundColor = "blue";
      this.chosenDay = day.toString();

    } else {
      // if the data doesn't exist in firebase
      this.oppeningInfo = "Data currently not available!";
      this.item.currentPop = 0;
    }
    //console.log(this.item.place_id);
    this.cafe = adb.object('/cafe_list/' + this.item.place_id);

    //kind of inefficient, but i couldnt call the function changeGradient here for some reason
    
    let time_diff = Math.round(Date.now()/60000)-this.item.busyness[0][0];//current time in form of milliseconds
    console.log("time_diff", time_diff);
    if (this.item.busyness[0][1] && (time_diff<60)){
      this.slider_percent = this.item.busyness[0][1];
    }
    else if (this.item.populartimes != null){
      this.slider_percent = this.item.populartimes[(day-1)]["data"][hours];
    }

    if (this.item.busyness[0][1] / 100 <= 0.3) {
      this.item.color = "secondary";
    }
    else if (this.item.busyness[0][1] / 100 <= 0.6) {
      this.item.color = "orange"
    }
    else {
      this.item.color = "danger";
    }
    //console.log(this.item);

  }

  navigate() {
    if (this.platform.is('mobileweb') || this.platform.is('core')) {
      // This will only print when running on desktop
      console.log("I'm a regular browser!");
      window.open(this.applemaps, "_self");
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

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  updateStatus(color: any) {
    // update colored button if user changes color status
    this.item.status = color.status;
    this.cafe.update(color);
  }

  changeGradient(ratio: any) {
    if (ratio <= 0.3) {
      this.item.color = "secondary";
    }
    else if (ratio <= 0.8) {
      this.item.color = "orange"
    }
    else {
      this.item.color = "danger";
    }
  }

  changeGradient2(ratio: number){
    // red:    #ff0000,
    // yellow: #ffff00,
    // green:  #008000
    if (ratio == 0.5){
      this.item.color = "#ffff00";
    }

    else if(ratio < 0.5){
      let r = ratio/0.5;
      let r2 = 1-r;

      let red = Math.round(255*r).toString(16); // #ff
      let green = Math.round(255*r + 128*r2).toString(16); // #ff*r + #80*r2
      // blue is 00
      if (red.length == 1) red = '0'+red;
      if (green.length == 1) green = '0' + green;

      //this.item.color = '#'+red.toString(16).substring(0,2)+green.toString(16).substring(0,2)+"00";
      this.item.color = '#'+red+green+"00";
      console.log("Slider color changed to "+this.item.color);
    }
    else {
      let r2 = 1-((ratio-.5)/.5);

      let green = Math.round(255*r2).toString(16);
      if (green.length == 1) green = '0' + green;

      this.item.color = '#ff'+green+"00";
      console.log("Slider color changed to "+this.item.color);
    }
    
    //var busyness = {'busyness': {'0': [timestamp, ratio*100] }}
    //this.cafes.update(busyness)
  }

  updateDataOfDay(): void {
    if (this.item.populartimes != null) {
      // if the data exists in firebase, get them from firebase and parse popular times info
      var day = parseInt(this.chosenDay);
      let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = this.item.populartimes[day - 1]["data"].slice(6, 24);
      clone[0].label = 'Historical Popularity on ' + this.item.populartimes[day - 1].name;
      this.barChartData = clone;
      this.oppeningInfo = "";
    } else {
      // if the data doesn't exist, we assume the cafe is closed
      this.oppeningInfo = "Data currently not available!";
    }
  }

  SetNewPercent(): void {
let alert = this.alertCtrl.create({
    title: 'Thank you!',
    subTitle: 'Thank you for your report!',
    buttons: ['Dismiss']
  });
  alert.present();
    const busyness_in_fire = this.adb.object('/cafe_list/' + this.item["id"] +"/busyness/0");
   
    let time_current_min = Math.round(Date.now()/60000);//current time in form of milliseconds
    console.log("time_current_min", time_current_min)
    busyness_in_fire.update({0:time_current_min});
        console.log("slider_percent", this.slider_percent);

    busyness_in_fire.update({1:this.slider_percent});

    // let E_t = parseFloat( Math.exp(-(time_input_min - time_db_min) * c).toFixed(2));
    // let percent_current = Math.round((percent_input + percent_db * E_t) / ( 1 + E_t));
  };
}
