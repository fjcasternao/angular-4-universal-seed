import { Component, Input, SimpleChanges } from '@angular/core';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import { UserSummary, FullUser } from "../app.entities";

@Component({
    selector: 'user-details',
    templateUrl: 'user-details.template.html'
})
export class UserDetails {

    fullUser: FullUser;

    private sub: any;

    @Input()
    user: UserSummary;
    
    constructor(private http: TransferHttp) {}

    ngOnChanges(changes: SimpleChanges) {
        this.sub = this.http.get('http://localhost:8000/users/' + changes.user.currentValue.index).subscribe(res => {
            this.fullUser = res as FullUser;
        }, err => {
            console.log(err);
        });
    }

    //Destroy subscriptions
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
