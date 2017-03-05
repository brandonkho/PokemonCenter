import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import {SocketService} from './../../services/socket-service/socket.service';
import {AuthService} from './../../services/auth-service/auth.service';
import {UserService} from '../../services/user-service/user.service';
import {MessagingService} from '../../services/messaging-service/messaging.service';

declare let $;

@Component({
  moduleId: module.id,
  selector: 'messaging',
  templateUrl: 'messaging.component.html',
  styleUrls: ['messaging.component.css']
  
})

export class MessagingComponent implements OnInit, OnDestroy { 
    title: string;
    private sub: any;
    otherUser: any;
    message: string;
    messageList: any[];

    constructor(
        private socketService: SocketService, 
        private authService: AuthService, 
        private userService: UserService, 
        private messagingService:MessagingService, 
        private route: ActivatedRoute, 
        private router: Router
        ){
        socketService.socket.on('new_msg', ((data) =>{
            console.log(data);
            console.log(this.otherUser.username)
            if(data.from == this.otherUser.username){
                $(`<p class="chat-bubble">`+data.msg+`</p>`).appendTo($('#message-box'));
            }
            
        }).bind(this));

        socketService.socket.on('self_msg', ((data) =>{

            // $('#box').append($'<p>'+data.msg+'</p>');
            $(`<p class="chat-bubble-self">`+data.msg+`</p>`).appendTo($('#message-box'));
                
        }).bind(this));


    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.userService.getUserByUsername(params['username'])
            .subscribe(user => {
                console.log(user);
                this.otherUser = user;
            }, 
            error => console.log("Error: ", error), 
            () => {
                console.log(this.otherUser.username);
                this.messagingService.getMessages(this.otherUser.username)
                .subscribe(messageList => {
                    console.log(messageList);
                    this.messageList = messageList;
                });
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
        this.socketService.socket.emit('chat', {to: this.otherUser.username, from: this.authService.currentUser.username, msg: this.message});
        this.message = '';
    }
    
}
