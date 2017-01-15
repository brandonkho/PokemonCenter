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
var auth_service_1 = require('../../services/auth-service/auth.service');
//import {Task} from '../../../Task';
var forms_1 = require('@angular/forms');
var LoginComponent = (function () {
    function LoginComponent(authService, formBuilder) {
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.closable = true;
        this.visibleChange = new core_1.EventEmitter();
        this.username = '';
        this.password = '';
        this.loginForm = formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
        });
    }
    LoginComponent.prototype.isValid = function (field) {
        var formField = this.loginForm.get(field);
        console.log(formField.valid);
        return formField.valid || formField.pristine;
    };
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.logout = function (event) {
        this.authService.logout().then(function () {
            console.log('logged ou');
        });
    };
    LoginComponent.prototype.submit = function (model) {
        var _this = this;
        this.authService.login(model.username, model.password).then(function () {
            console.log('getuser');
            _this.authService.getCurrentUser();
            _this.close();
        });
    };
    LoginComponent.prototype.close = function () {
        this.loginForm.reset();
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LoginComponent.prototype, "closable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LoginComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LoginComponent.prototype, "visibleChange", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css'],
            animations: [
                core_1.trigger('dialog', [
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'scale3d(.3, .3, .3)' }),
                        core_1.animate(100)
                    ]),
                    core_1.transition('* => void', [
                        // animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
                        core_1.animate(200, core_1.style({ transform: 'translateY(100%)' }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, forms_1.FormBuilder])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map