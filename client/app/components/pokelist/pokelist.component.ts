import { Component, ElementRef } from '@angular/core';
import {PokemonService} from '../../services/pokemon-service/pokemon.service';
//import {Task} from '../../../Task';
import {ModalModule} from "ng2-modal";
import {LoginComponent} from './../auth/login.component';
import {PokemonComponent} from './../pokemon/pokemon.component';

import {Pokemon} from './../../angular-models/pokemon';

@Component({
  moduleId: module.id,
  selector: 'pokelist',
  host: {
        '(document:click)': 'handleClick($event)',
    },
  templateUrl: 'pokelist.component.html',
  styleUrls: ['pokelist.component.css']
})

export class PokeListComponent { 
    pokemonList: Pokemon[];
    name: string = '';
    level: number;
    isShiny: boolean;
    // public query = '';
    public countries = [ "Albania","Andorra","Armenia", "Articuno", "Austria","Azerbaijan","Belarus",
                        "Belgium","Bosnia & Herzegovina","Bulgaria","Croatia","Cyprus",
                        "Czech Republic","Denmark","Estonia","Finland","France","Georgia",
                        "Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo",
                        "Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta",
                        "Moldova","Monaco","Montenegro","Netherlands","Norway","Poland",
                        "Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia",
                        "Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"];
    public filteredList = [];
    public elementRef;
    
    constructor(private pokemonService:PokemonService, myElement: ElementRef){
        this.elementRef = myElement;
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
            level: this.level,
            isShiny: this.isShiny
        }
        
        this.pokemonService.addPokemon(newPokemon)
            .subscribe(task => {
                this.pokemonList.push(task);
                this.name = '';
            });
    }

    filter() {
        if (this.name !== ""){
            this.filteredList = this.countries.filter(function(el){
                return (el.toLowerCase().substr(0,this.name.length) === this.name.toLowerCase());
            }.bind(this));
        }else{
            this.filteredList = [];
        }
    }
     
    select(item){
        this.name = item;
        this.filteredList = [];
    }

    handleClick(event){
       var clickedComponent = event.target;
       var inside = false;
       do {
           if (clickedComponent === this.elementRef.nativeElement) {
               inside = true;
           }
          clickedComponent = clickedComponent.parentNode;
       } while (clickedComponent);
        if(!inside){
            this.filteredList = [];
        }
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
