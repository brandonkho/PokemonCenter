import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{
    constructor(private http:Http){
        console.log('User Service Initialized...');
    }
    
    getUserByUsername(username){
        return this.http.get('/users/username/' + username)
            .map(res => res.json());
    }

    
}