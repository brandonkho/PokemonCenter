import { Component } from '@angular/core';
import {TaskService} from './services/task-service/task.service';
import {PokemonService} from './services/pokemon-service/pokemon.service';
import {AuthService} from './services/auth-service/auth.service';
import {UserService} from './services/user-service/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers:[TaskService, PokemonService, AuthService, UserService]
})

export class AppComponent {
	constructor(private authService:AuthService, private router: Router){
    
    }

    logout(event){
        this.authService.logout().then(() => {
        	console.log('error here');
        	this.authService.getCurrentUser();
        });
        	
    }

    goToProfile(username) {
	  this.router.navigate(['/user', username]);
	}


}
