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

    }
    pagedetails = DetailsPage;
}

