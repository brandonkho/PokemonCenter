import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PokemonService{
    constructor(private http:Http){
        console.log('Pokemon Service Initialized...');
    }
    
    getPokemon(){
        return this.http.get('/api/pokemon')
            .map(res => res.json());
    }

    searchPokemon(searchTerm){
        return this.http.get('/api/pokemon/?name=' + searchTerm)
            .map(res => res.json());
    }
    
    addPokemon(newPokemon){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/pokemon', JSON.stringify(newPokemon), {headers: headers})
            .map(res => res.json());
    }
    
    deletePokemon(id){
        return this.http.delete('/api/pokemon/'+id)
            .map(res => res.json());
    }
    
    updateStatus(pokemon){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/pokemon/'+pokemon._id, JSON.stringify(pokemon), {headers: headers})
            .map(res => res.json());
    }
}