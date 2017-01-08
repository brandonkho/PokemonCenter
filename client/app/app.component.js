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
var task_service_1 = require('./services/task-service/task.service');
var pokemon_service_1 = require('./services/pokemon-service/pokemon.service');
var auth_service_1 = require('./services/auth-service/auth.service');
var user_service_1 = require('./services/user-service/user.service');
var socket_service_1 = require('./services/socket-service/socket.service');
var router_1 = require('@angular/router');
var AppComponent = (function () {
    function AppComponent(authService, socketService, router) {
        this.authService = authService;
        this.socketService = socketService;
        this.router = router;
        socketService.socket = io();
    }
    AppComponent.prototype.logout = function (event) {
        var _this = this;
        this.authService.logout().then(function () {
            console.log('error here');
            _this.authService.getCurrentUser();
        });
    };
    AppComponent.prototype.goToProfile = function (username) {
        this.router.navigate(['/user', username]);
    };
    AppComponent.prototype.send = function (event) {
        this.socketService.socket.emit('message', 'Hey!');
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            providers: [task_service_1.TaskService, pokemon_service_1.PokemonService, auth_service_1.AuthService, user_service_1.UserService, socket_service_1.SocketService]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, socket_service_1.SocketService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map