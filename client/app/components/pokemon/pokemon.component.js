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
var pokemon_1 = require('./../../angular-models/pokemon');
var PokemonComponent = (function () {
    function PokemonComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', pokemon_1.Pokemon)
    ], PokemonComponent.prototype, "pokemon", void 0);
    PokemonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pokemon',
            template: "\n  \t<figure>\n  \t\t<img class=\"art\" [ngClass]=\"pokemon.name.toLowerCase()\">\n  \t</figure>\n    <h2 class=\"name\">{{pokemon.name}}</h2> \n    <h3>Level: {{pokemon.level}}</h3>  \n    <p> rmao </p>\n",
            styleUrls: ['pokemon.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], PokemonComponent);
    return PokemonComponent;
}());
exports.PokemonComponent = PokemonComponent;
//# sourceMappingURL=pokemon.component.js.map