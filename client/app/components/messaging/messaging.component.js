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
var router_1 = require('@angular/router');
var socket_service_1 = require('./../../services/socket-service/socket.service');
var auth_service_1 = require('./../../services/auth-service/auth.service');
var user_service_1 = require('../../services/user-service/user.service');
var MessagingComponent = (function () {
    function MessagingComponent(socketService, authService, userService, route, router) {
        var _this = this;
        this.socketService = socketService;
        this.authService = authService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        socketService.socket.on('new_msg', (function (data) {
            console.log(data);
            console.log(_this.otherUser.username);
            if (data.from == _this.otherUser.username) {
                $('#box').append($, '<p>' + data.msg + '</p>');
            }
        }).bind(this));
        socketService.socket.on('self_msg', (function (data) {
            $('#box').append($, '<p>' + data.msg + '</p>');
        }).bind(this));
    }
    MessagingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.userService.getUserByUsername(params['username'])
                .subscribe(function (user) {
                console.log(user);
                _this.otherUser = user;
            });
            //this.username = params['username']; // (+) converts string 'id' to a number
            // In a real app: dispatch action to load the details here.
        });
        this.socketService.socket.emit('join', { user: this.authService.currentUser });
    };
    MessagingComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    MessagingComponent.prototype.sendMessage = function () {
        this.socketService.socket.emit('chat', { to: this.otherUser.username, from: this.authService.currentUser.username, msg: this.message });
        this.message = '';
    };
    MessagingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'messaging',
            templateUrl: 'messaging.component.html',
        }), 
        __metadata('design:paramtypes', [socket_service_1.SocketService, auth_service_1.AuthService, user_service_1.UserService, router_1.ActivatedRoute, router_1.Router])
    ], MessagingComponent);
    return MessagingComponent;
}());
exports.MessagingComponent = MessagingComponent;
//# sourceMappingURL=messaging.component.js.map