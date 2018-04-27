import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage} from "../details/details";
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Geolocation} from "@ionic-native/geolocation";
import {ILatLng, LatLng} from '@ionic-native/google-maps';//LocationService
import {HttpClient} from "@angular/common/http";
import { Spherical} from "@ionic-native/google-maps";
import {Cafe} from "../../app/cafe";


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage
{
    cafe_list: Observable<any[]>;
    angularList: AngularFireList<{}>;
    pagedetails = DetailsPage; //Jump another page
    coords: LatLng;
    apiResults: any;
    show_list: Array<any>;
    matchedResults: Observable<any[]>;

    constructor(public navCtrl: NavController, public adb:  AngularFireDatabase, private http: HttpClient, private geolocation: Geolocation, private spherical: Spherical)
    {
        var maxShowLen = 10;
        this.show_list = [];
        //this.cafe_list = this.adb.list('/cafe_list/').valueChanges();
        this.geolocation.getCurrentPosition().then((resp) =>
        {
            var userCoords = new LatLng(resp.coords.latitude, resp.coords.longitude);
            this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+
            resp.coords.latitude +','
            +resp.coords.longitude +
            '&rankby=distance&type=cafe&key=AIzaSyCfPG3wQmh-RMjmgY1F3xipVbmkvdq49RM').subscribe(
            data=>
            {
              this.apiResults = data["results"];
              this.matchedResults = this.apiResults;
              var i = 0;
              var showNum = 0;
              var resLen = Object.keys(this.apiResults).length;

              while(i < resLen && showNum < maxShowLen){
                  var apiResult = this.apiResults[i]
                  var id = apiResult.place_id;
                  let res = this.adb.object('/cafe_list/'+id);
                  res.valueChanges().subscribe(item => {
                      if(item["id"]!=undefined){
                        console.log(item);
                        console.log(apiResult["geometry"]);
                        //item["distance"] = compute_distance(userCoords, item["coordinates"]);
                        var newStatus = chooseColor(getCurrentPop(item));
                        this.adb.object('/cafe_list/'+item["id"]).update({ status: newStatus});
                        this.show_list.push(item);
                        showNum++;
                      }
                  });
                  i++;
              }
              /*
              for(var i = 0; i <  i++){
                  var id = this.apiResults[i].place_id;
                  let res = this.adb.object('/cafe_list/'+id);
                  //res.update({"find":"true"});
                  res.valueChanges().subscribe(item => {
                        console.log(item["id"]);
                  });
                  
                  //this.angularList.push(res);
              }
              */
              //this.cafe_list = this.angularList.valueChanges();
              //console.log(this.results);
            });
            
        }).catch((error) =>
        {
            console.log('Error getting location', error);
        });

        // console.log(Object.keys(this.results).length);
        // {
        // //   console.log(var)
        //     // this.cafe_list.subscribe(items =>
        //     // {
        //     //     items.forEach(item =>
        //     //     {
        //     //       console.log(item.id)
        //     //         if (item.id == res['id'])
        //     //         {
        //     //             var newStatus = chooseColor(getCurrentPop(item));
        //     //             this.adb.object('/cafe_list/'+item.number).update({ status: newStatus});
        //     //         }
        //     //     });
        //     // });
        // }
    };
  


}

function compute_distance(coords1, coords2) {
    return (Spherical.computeDistanceBetween(coords1,coords2)/(1610)).toFixed(1);
}

// function
function chooseColor(pop){
    // choose color base on the current popularity
    if(pop === -1) {
        return "black";
    }else if(pop === 0) {
        return "gray"
    } else if(pop < 60) {
        return "green"
    } else if(pop < 85) {
        return "orange"
    } else {
        return "red"
    }
}

function getCurrentPop(cafe){
    let date = new Date();
    // get current date and hour
    let hours = date.getHours();
    let day = date.getDay();
    if(cafe.populartimes==null){
        return -1;
        // if the data doesn't exist, return -1 make the color become black
    }else{
        return cafe.populartimes[day-1]["data"][hours];
        // get the data from firebase
    }
}