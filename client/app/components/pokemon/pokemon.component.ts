import { Component, Input } from '@angular/core';
import { Pokemon } from './../../angular-models/pokemon';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'pokemon',
  template: `
  	
  	<figure>
  		<img class="art" [ngClass]="pokemon.name.toLowerCase()">
  	</figure>
  	
  	
    <h2 class="name">{{pokemon.name}}</h2> 
    <h3 class="level">Level: {{pokemon.level}}</h3>
    <div *ngIf="pokemon._owner" class="level">
      <a (click)="goToMessages(pokemon._owner.username)">{{pokemon._owner.username}}</a>
    </div>    
    <p> rmao </p>
    
`,
  styleUrls: ['pokemon.component.css']
})
export class PokemonComponent {
  @Input() pokemon: Pokemon;

  constructor(private router: Router){
      
  }

  goToMessages(username) {
      this.router.navigate(['/messages', username]);
    }

}