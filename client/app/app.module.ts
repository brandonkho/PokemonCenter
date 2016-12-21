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
import {ModalModule} from "ng2-modal";

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, ModalModule ],
  declarations: [AppComponent, TasksComponent, PokeListComponent, LoginComponent, RegisterComponent, PokemonComponent, DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
