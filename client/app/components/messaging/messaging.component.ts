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
  styleUrls: ['messaging.component.css']
  
})

export class MessagingComponent implements OnInit, OnDestroy { 
    title: string;
    private sub: any;
    otherUser: any;
    message: string;

    constructor(private socketService: SocketService, private authService: AuthService, private userService: UserService, private route: ActivatedRoute, private router: Router){
        socketService.socket.on('new_msg', ((data) =>{
            console.log(data);
            console.log(this.otherUser.username)
            if(data.from == this.otherUser.username){
                $(`<p style="position:relative;
  padding:15px;
  margin:1em 0 3em;
  color:#000;
  background:#a422e5; /* default background for browsers without gradient support */
  -webkit-border-radius:10px;
  -moz-border-radius:10px;
  border-radius:10px;">`+data.msg+`</p>`).appendTo($('#box'));
            }
            
        }).bind(this));

        socketService.socket.on('self_msg', ((data) =>{

            // $('#box').append($'<p>'+data.msg+'</p>');
            $(`<p style="position:relative;
  padding:15px;
  margin:1em 0 3em;
  color:#000;
  background:#f3961c; /* default background for browsers without gradient support */
  /* css3 */
  background:-webkit-gradient(linear, 0 0, 0 100%, from(#f9d835), to(#f3961c));
  background:-moz-linear-gradient(#f9d835, #f3961c);
  background:-o-linear-gradient(#f9d835, #f3961c);
  background:linear-gradient(#f9d835, #f3961c);
  -webkit-border-radius:10px;
  -moz-border-radius:10px;
  border-radius:10px;">`+data.msg+`</p>`).appendTo($('#box'));
                
        }).bind(this));
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.userService.getUserByUsername(params['username'])
            .subscribe(user => {
                console.log(user);
                this.otherUser = user;
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
