import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, state, style, animate, transition } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
//import {Task} from '../../../Task';

@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl: 'register.component.html',
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

export class RegisterComponent implements OnInit {
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>(); 
    username: string = '';
    password: string = '';
    email: string = '';
    password2: string = '';
    
    constructor(private authService:AuthService){
        
    }
    
    ngOnInit() { }

    submit() {
        console.log(this.username); 
        this.authService.register(this.username, this.password, this.email, this.password2).then(() => {
            this.authService.getCurrentUser();
        });
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }
    
    
}
