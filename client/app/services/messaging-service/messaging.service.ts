import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from './../auth-service/auth.service';

@Injectable()
export class MessagingService{
    constructor(private http:Http, private authService:AuthService){
        console.log('Messaging Service Initialized...');
    }

    getConversations(){
        return this.http.get('/api/conversations')
            .map(res => res.json());
    }

    getConversationsOfUser(id){
        return this.http.get('/api/conversations/' + id)
            .map(res => res.json());
    }
    
    getMessages(otherUserName){
        return this.http.get('/api/conversations/' + this.authService.currentUser.username + '/' + otherUserName + '/messages')
            .map(res => res.json());
    }

    
}