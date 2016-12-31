import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {PokeListComponent} from './components/pokelist/pokelist.component';
import {LoginComponent} from './components/auth/login.component';
import {RegisterComponent} from './components/auth/register.component';
import {PokemonComponent} from './components/pokemon/pokemon.component';
import {DialogComponent} from './components/dialog/dialog.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ModalModule} from "ng2-modal";
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'username', component: ProfileComponent },
  { path: '', component: PokeListComponent  },
];

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, ModalModule, RouterModule.forRoot(appRoutes) ],
  declarations: [AppComponent, TasksComponent, PokeListComponent, LoginComponent, RegisterComponent, PokemonComponent, DialogComponent, ProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
