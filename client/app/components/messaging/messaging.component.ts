import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import {SocketService} from './../../services/socket-service/socket.service';
import {AuthService} from './../../services/auth-service/auth.service';
import {UserService} from '../../services/user-service/user.service';

declare let $;

@Component({
  moduleId: module.id,
  selector: 'messaging',
  templateUrl: 'messaging.component.html',
  
})

export class MessagingComponent implements OnInit, OnDestroy { 
    title: string;
    private sub: any;
    recipient: any;
    message: string;

    constructor(private socketService: SocketService, private authService: AuthService, private userService: UserService, private route: ActivatedRoute, private router: Router){
        socketService.socket.on('new_msg', ((data) =>{
            $('#box').append($'<p>'+data.msg+'</p>');
        }).bind(this));
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.userService.getUserByUsername(params['username'])
            .subscribe(user => {
                console.log(user);
                this.recipient = user;
            });
            //this.username = params['username']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });
        this.socketService.socket.emit('join', {user: this.authService.currentUser});
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    sendMessage(){
        this.socketService.socket.emit('chat', {to: this.recipient.username, from: this.authService.currentUser.username, msg: this.message});
        this.message = '';
    }
    
}
