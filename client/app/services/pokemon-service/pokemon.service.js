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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var PokemonService = (function () {
    function PokemonService(http) {
        this.http = http;
        console.log('Pokemon Service Initialized...');
    }
    PokemonService.prototype.getPokemon = function () {
        return this.http.get('/api/pokemon')
            .map(function (res) { return res.json(); });
    };
    PokemonService.prototype.searchPokemon = function (searchTerm) {
        return this.http.get('/api/pokemon/?name=' + searchTerm)
            .map(function (res) { return res.json(); });
    };
    PokemonService.prototype.addPokemon = function (newPokemon) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/pokemon', JSON.stringify(newPokemon), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PokemonService.prototype.deletePokemon = function (id) {
        return this.http.delete('/api/pokemon/' + id)
            .map(function (res) { return res.json(); });
    };
    PokemonService.prototype.updateStatus = function (pokemon) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/pokemon/' + pokemon._id, JSON.stringify(pokemon), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PokemonService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PokemonService);
    return PokemonService;
}());
exports.PokemonService = PokemonService;
//# sourceMappingURL=pokemon.service.js.map