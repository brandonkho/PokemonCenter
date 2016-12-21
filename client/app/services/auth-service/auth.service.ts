import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService{
    user: boolean;
    constructor(private http:Http){
        console.log('Auth Service Initialized...');
        this.user = null;

        // return ({
        //   isLoggedIn: isLoggedIn,
        //   getUserStatus: getUserStatus,
        //   login: login,
        //   logout: logout,
        //   register: register
        // });
    }

    isLoggedIn() {
      if(this.user) {
        return true;
      } else {
        return false;
      }
    }
    
    getUserStatus() {
      return this.user;
    }

    login(username, password){
        console.log(username);
        console.log(password);
        return new Promise((resolve, reject) => {
            this.http.post('/users/login', {username: username, password: password})
            .map((res) => {
                res.json()
            })
            .subscribe((data) => {
                console.log(data);
                resolve();
            },(err) => {
                reject();
            });
        });
    }

    logout(){
        return new Promise((resolve, reject) => {
            this.http.get('users/logout')
            .map((res) => {
                res.json()
            })
            .subscribe((data) => {
                console.log(data);
                resolve();
            },(err) => {
                reject();
            });
        });
    }

    register(username, password, email, password2){
        return new Promise((resolve, reject) => {
            this.http.post('/users/register', {username: username, password: password, email: email, password2: password2})
            .map((res) => {
                res.json()
            })
            .subscribe((data) => {
                console.log(data);
                resolve();
            },(err) => {
                reject();
            });
        });
    }


    
}