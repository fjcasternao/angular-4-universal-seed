import { Component, OnInit } from '@angular/core';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import { UserSummary } from "../app.entities";


@Component({
  selector: 'home-view',
  templateUrl: 'home-view.template.html'
})

export class HomeView {
  public usersList: UserSummary[];
  public setClickedRow: Function;
  selectedUser : UserSummary;

  private sub: any;

  constructor(private http: TransferHttp) {
    this.setClickedRow = function (index) {
      this.selectedUser = this.usersList[index];
    }
  }

  ngOnInit() {
    this.sub = this.http.get('http://localhost:8000/users/').subscribe(res => {
      this.usersList = res as UserSummary[];
    }, err => {
      console.log(err);
    });
  }

    //Destroy subscriptions
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
