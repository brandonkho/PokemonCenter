import { Component } from '@angular/core';
import {TaskService} from './services/task-service/task.service';
import {PokemonService} from './services/pokemon-service/pokemon.service';
import {AuthService} from './services/auth-service/auth.service';


@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers:[TaskService, PokemonService, AuthService]
})

export class AppComponent {
	constructor(private authService:AuthService){
    
    }

    logout(event){
        this.authService.logout().then(() => {
        	console.log('error here');
        	this.authService.getCurrentUser();
        });
        	
    }


}
