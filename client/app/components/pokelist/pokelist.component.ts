import { Component } from '@angular/core';
import {PokemonService} from '../../services/pokemon-service/pokemon.service';
//import {Task} from '../../../Task';
import {ModalModule} from "ng2-modal";
import {LoginComponent} from './../auth/login.component';
import {PokemonComponent} from './../pokemon/pokemon.component';

import {Pokemon} from './../../angular-models/pokemon';

@Component({
  moduleId: module.id,
  selector: 'pokelist',
  templateUrl: 'pokelist.component.html',
  styleUrls: ['pokelist.component.css']
})

export class PokeListComponent { 
    pokemonList: Pokemon[];
    name: string;
    
    constructor(private pokemonService:PokemonService){
        this.pokemonService.getPokemon()
            .subscribe(pokemonList => {
                this.pokemonList = pokemonList;
            });
    }

    search(searchTerm){
        console.log("search");
        this.pokemonService.searchPokemon(searchTerm)
            .subscribe(pokemonList => {
                
                this.pokemonList = pokemonList;
            });

    }
    
    addPokemon(event){
        event.preventDefault();
        var newPokemon = {
            name: this.name,
            level: 30,
            isShiny: false
        }
        
        this.pokemonService.addPokemon(newPokemon)
            .subscribe(task => {
                this.pokemonList.push(task);
                this.name = '';
            });
    }
    
    // deleteTask(id){
    //     var tasks = this.tasks;
     
    //     this.taskService.deleteTask(id).subscribe(data => {
    //         if(data.n == 1){
    //             for(var i = 0;i < tasks.length;i++){
    //                 if(tasks[i]._id == id){
    //                     tasks.splice(i, 1);
    //                 }
    //             }
    //         }
    //     });
    // }
    
    // updateStatus(task){
    //     var _task = {
    //         _id:task._id,
    //         title: task.title,
    //         isDone: !task.isDone
    //     };
        
    //     this.taskService.updateStatus(_task).subscribe(data => {
    //         task.isDone = !task.isDone;
    //     });
    // }
}
