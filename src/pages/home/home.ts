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

              console.log(this.apiResults);

              this.matchedResults = this.apiResults;
              var i = 0;
              var showNum = 0;
              var resLen = Object.keys(this.apiResults).length;
              while(i < resLen && showNum < maxShowLen){
                  var apiResult = this.apiResults[i]
                  var id = apiResult.place_id;
                  let res = this.adb.object('/cafe_list/'+id);
                  res.valueChanges().subscribe(item => {
                  		console.log("find one");
                  		console.log(item);
                      if(item!=null && item['id']!=undefined){
                        
                        //console.log(apiResult["geometry"]);
                        item["distance"] = compute_distance(userCoords, item["coordinates"]);
                        var newStatus = chooseColor(getCurrentPop(item));
                        this.adb.object('/cafe_list/'+item["id"]).update({ status: newStatus});
                        this.show_list.push(item);
                        showNum++;
                      }
                  });
                  i++;
              }
            });
            
        }).catch((error) =>
        {
            console.log('Error getting location', error);
        });
    };
}

function compute_distance(coords1, coords2) {
    //google plugin version  -- driving distance
    //return (Spherical.computeDistanceBetween(coords1,coords2)/(1610)).toFixed(1);
    
    //temporary version   -- straight-line distance 
    var dis = (getDistanceFromLatLonInKm(coords1["lat"],coords1["lng"],coords2["lat"],coords2["lng"])/1.61).toFixed(1);
    return dis;
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
    	if(day===0){ // the day is sunday
    		day = 7
    	}
        return cafe.populartimes[(day-1)]["data"][hours];
        // get the data from firebase
    }
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}