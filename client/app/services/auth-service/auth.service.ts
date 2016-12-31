import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService{
    currentUser: any;
    user: boolean;
    constructor(private http:Http){
        console.log('Auth Service Initialized...');
        this.user = null;
        this.getCurrentUser();

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
                this.user = true;
                resolve();
            },(err) => {
                console.log('err');
                this.getCurrentUser();
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
                
                console.log('error over here');
                resolve();
            },(err) => {
                console.log('rejected');
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


    getCurrentUser(){
        
        return new Promise((resolve, reject) => {
            this.http.get('users/currentuser')
            .map((res) => {
                
                if(res._body == ""){
                    console.log('error in get current user');
                    this.currentUser = null;
                }else{
                    console.log(res);
                    this.currentUser = res.json();
                }
                
            })
            .subscribe((data) => {
                
                
                resolve();
            },(err) => {
                reject();
            });
        });
    }

    getPokemon(){
        return this.http.get('/users/currentuser')
            .map(res => res.json());
    }

    
}