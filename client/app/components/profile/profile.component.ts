import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from '../../services/user-service/user.service';
//import {Task} from '../../../Task';
import {ModalModule} from "ng2-modal";
import {LoginComponent} from './../auth/login.component';
import {PokemonComponent} from './../pokemon/pokemon.component';
import { Router, ActivatedRoute, Params } from '@angular/router';


import {Pokemon} from './../../angular-models/pokemon';

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: 'profile.component.html',
  
})

export class ProfileComponent implements OnInit, OnDestroy { 
    username: string;
    private sub: any;
    user: any;
    
    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService){
        
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.userService.getUserByUsername(params['username'])
            .subscribe(user => {
                console.log(user);
                this.user = user;
            });
            //this.username = params['username']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    
}
