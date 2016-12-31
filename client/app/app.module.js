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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var tasks_component_1 = require('./components/tasks/tasks.component');
var pokelist_component_1 = require('./components/pokelist/pokelist.component');
var login_component_1 = require('./components/auth/login.component');
var register_component_1 = require('./components/auth/register.component');
var pokemon_component_1 = require('./components/pokemon/pokemon.component');
var dialog_component_1 = require('./components/dialog/dialog.component');
var profile_component_1 = require('./components/profile/profile.component');
var ng2_modal_1 = require("ng2-modal");
var router_1 = require('@angular/router');
var appRoutes = [
    { path: ':username', component: profile_component_1.ProfileComponent },
    { path: '', component: pokelist_component_1.PokeListComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, ng2_modal_1.ModalModule, router_1.RouterModule.forRoot(appRoutes)],
            declarations: [app_component_1.AppComponent, tasks_component_1.TasksComponent, pokelist_component_1.PokeListComponent, login_component_1.LoginComponent, register_component_1.RegisterComponent, pokemon_component_1.PokemonComponent, dialog_component_1.DialogComponent, profile_component_1.ProfileComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map