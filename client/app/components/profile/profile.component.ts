import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from '../../services/user-service/user.service';
//import {Task} from '../../../Task';
import {ModalModule} from "ng2-modal";
import {LoginComponent} from './../auth/login.component';
import {PokemonComponent} from './../pokemon/pokemon.component';
import { Router, ActivatedRoute, Params } from '@angular/router';


import {Pokemon} from './../../angular-models/pokemon';

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy { 
    username: string;
    private sub: any;
    user: any;
    filesToUpload: Array<File>;
    
    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService){
        this.filesToUpload = [];
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.userService.getUserByUsername(params['username'])
            .subscribe(user => {
                console.log(user);
                this.user = user;
            });
            //this.username = params['username']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    upload() {
        this.makeFileRequest("http://localhost:3000/upload", [], this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
    }
 
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }
 
    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        console.log(xhr.response);
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }
    
}
