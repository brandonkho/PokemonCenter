import { Component } from '@angular/core';
import {PokemonService} from '../../services/pokemon-service/pokemon.service';
//import {Task} from '../../../Task';
import {ModalModule} from "ng2-modal";
import {LoginComponent} from './../auth/login.component';
import {PokemonComponent} from './../pokemon/pokemon.component';

import {Pokemon} from './../../angular-models/pokemon';

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: 'profile.component.html',
  
})

export class ProfileComponent { 
    
    
    constructor(private pokemonService:PokemonService){
        
    }

    
}
