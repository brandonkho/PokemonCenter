import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, state, style, animate, transition } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
//import {Task} from '../../../Task';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})

export class LoginComponent implements OnInit{
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>(); 
    username: string = '';
    password: string = '';
    
    constructor(private authService:AuthService){
        
    }

    ngOnInit() { }
    
    

    logout(event){
        this.authService.logout().then(() => {
            console.log('logged ou');
        });
    }

    submit() { 
        this.authService.login(this.username, this.password);
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }


    
    
}
