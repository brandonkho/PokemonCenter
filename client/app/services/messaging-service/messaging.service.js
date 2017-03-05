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
var auth_service_1 = require('./../auth-service/auth.service');
var MessagingService = (function () {
    function MessagingService(http, authService) {
        this.http = http;
        this.authService = authService;
        console.log('Messaging Service Initialized...');
    }
    MessagingService.prototype.getConversations = function () {
        return this.http.get('/api/conversations')
            .map(function (res) { return res.json(); });
    };
    MessagingService.prototype.getConversationsOfUser = function (id) {
        return this.http.get('/api/conversations/' + id)
            .map(function (res) { return res.json(); });
    };
    MessagingService.prototype.getMessages = function (otherUserName) {
        return this.http.get('/api/conversations/' + this.authService.currentUser.username + '/' + otherUserName + '/messages')
            .map(function (res) { return res.json(); });
    };
    MessagingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService])
    ], MessagingService);
    return MessagingService;
}());
exports.MessagingService = MessagingService;
//# sourceMappingURL=messaging.service.js.map