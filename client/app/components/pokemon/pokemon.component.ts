import { Component, Input } from '@angular/core';
import { Pokemon } from './../../angular-models/pokemon';

@Component({
  moduleId: module.id,
  selector: 'pokemon',
  template: `
  	<figure>
  		<img class="art" [ngClass]="pokemon.name.toLowerCase()">
  	</figure>
    <h2 class="name">{{pokemon.name}}</h2> 
    <h3>Level: {{pokemon.level}}</h3>  
    <p> rmao </p>
`,
  styleUrls: ['pokemon.component.css']
})
export class PokemonComponent {
  @Input() pokemon: Pokemon;

}