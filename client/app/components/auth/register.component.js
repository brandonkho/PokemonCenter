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
var RegisterComponent = (function () {
    function RegisterComponent(authService, formBuilder) {
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.closable = true;
        this.visibleChange = new core_1.EventEmitter();
        this.username = '';
        this.password = '';
        this.email = '';
        this.password2 = '';
        this.registerForm = formBuilder.group({
            username: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            password2: ['', forms_1.Validators.required],
        });
    }
    RegisterComponent.prototype.isValid = function (field) {
        var formField = this.registerForm.get(field);
        console.log(formField.valid);
        return formField.valid || formField.pristine;
    };
    RegisterComponent.prototype.ngOnInit = function () { };
    RegisterComponent.prototype.submit = function (model) {
        var _this = this;
        console.log(this.username);
        this.authService.register(model.username, model.password, model.email, model.password2).then(function () {
            _this.authService.getCurrentUser();
            _this.close();
        });
    };
    RegisterComponent.prototype.close = function () {
        this.registerForm.reset();
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RegisterComponent.prototype, "closable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RegisterComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RegisterComponent.prototype, "visibleChange", void 0);
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'register',
            templateUrl: 'register.component.html',
            styleUrls: ['login.component.css'],
            animations: [
                core_1.trigger('dialog', [
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'scale3d(.3, .3, .3)' }),
                        core_1.animate(100)
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate(100, core_1.style({ transform: 'scale3d(.0, .0, .0)' }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, forms_1.FormBuilder])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map