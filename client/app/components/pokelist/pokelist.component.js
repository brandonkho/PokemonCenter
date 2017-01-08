"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var pokemon_service_1 = require('../../services/pokemon-service/pokemon.service');
var list_1 = require('./list');
var PokeListComponent = (function () {
    function PokeListComponent(pokemonService, myElement) {
        var _this = this;
        this.pokemonService = pokemonService;
        this.name = '';
        this.filteredList = [];
        this.countries = list_1.PKMN;
        this.elementRef = myElement;
        this.pokemonService.getPokemon()
            .subscribe(function (pokemonList) {
            _this.pokemonList = pokemonList;
        });
    }
    ;
    PokeListComponent.prototype.search = function (searchTerm) {
        var _this = this;
        console.log("search");
        this.pokemonService.searchPokemon(searchTerm)
            .subscribe(function (pokemonList) {
            _this.pokemonList = pokemonList;
        });
    };
    PokeListComponent.prototype.addPokemon = function (event) {
        var _this = this;
        event.preventDefault();
        var newPokemon = {
            name: this.name,
            level: this.level,
            isShiny: this.isShiny
        };
        this.pokemonService.addPokemon(newPokemon)
            .subscribe(function (task) {
            _this.pokemonList.push(task);
            _this.name = '';
        });
    };
    PokeListComponent.prototype.filter = function () {
        if (this.name !== "") {
            this.filteredList = this.countries.filter(function (el) {
                return (el.toLowerCase().substr(0, this.name.length) === this.name.toLowerCase());
            }.bind(this));
        }
        else {
            this.filteredList = [];
        }
    };
    PokeListComponent.prototype.select = function (item) {
        this.name = item;
        this.filteredList = [];
    };
    PokeListComponent.prototype.handleClick = function (event) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filteredList = [];
        }
    };
    PokeListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pokelist',
            host: {
                '(document:click)': 'handleClick($event)',
            },
            templateUrl: 'pokelist.component.html',
            styleUrls: ['pokelist.component.css']
        }), 
        __metadata('design:paramtypes', [pokemon_service_1.PokemonService, core_1.ElementRef])
    ], PokeListComponent);
    return PokeListComponent;
}());
exports.PokeListComponent = PokeListComponent;
//# sourceMappingURL=pokelist.component.js.map