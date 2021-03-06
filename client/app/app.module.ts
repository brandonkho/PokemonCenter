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
import {MessagingComponent} from './components/messaging/messaging.component';
import {ModalModule} from "ng2-modal";
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'user/:username', component: ProfileComponent },
  { path: 'messages/:username', component: MessagingComponent},
  { path: '', component: PokeListComponent  },
];

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, ModalModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule ],
  declarations: [AppComponent, TasksComponent, PokeListComponent, LoginComponent, RegisterComponent, PokemonComponent, DialogComponent, ProfileComponent, MessagingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
