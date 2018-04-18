import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage} from "../details/details";
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    cafe_list: Observable<any[]>;

    constructor(public navCtrl: NavController, public adb:  AngularFireDatabase) {
    	
    	this.cafe_list = this.adb.list('/cafe_list/').valueChanges();
    	this.cafe_list.subscribe(items => {
    		items.forEach(item =>{
    			var newStatus = chooseColor(getCurrentPop(item));
    			console.log(item.number);
    			this.adb.object('/cafe_list/'+item.number).update({ status: newStatus}); 
    		});
    	});
    }
    pagedetails = DetailsPage;
}

function chooseColor(pop){
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
    let hours = date.getHours();
    let day = date.getDay();
    if(cafe.populartimes==null){
    	return -1;
    }else{
    	return cafe.populartimes[day-1]["data"][hours];
    }
}

