import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, state, style, animate, transition } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
//import {Task} from '../../../Task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
        // animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
        animate(200, style({transform: 'translateY(100%)'}))
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
    loginForm: FormGroup;
    
    constructor(private authService:AuthService, public formBuilder: FormBuilder){
        this.loginForm = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            
        });
    }

    isValid(field: string) {
        let formField = this.loginForm.get(field);
        console.log(formField.valid);
        return formField.valid || formField.pristine;
    }

    ngOnInit() { }
    
    

    logout(event){
        this.authService.logout().then(() => {
            console.log('logged ou');
        });
    }

    submit(model) { 
        this.authService.login(model.username, model.password).then(() => {
            console.log('getuser');
            this.authService.getCurrentUser();
            this.close();
        });
    }

    close() {
        this.loginForm.reset();
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }


    
    
}
