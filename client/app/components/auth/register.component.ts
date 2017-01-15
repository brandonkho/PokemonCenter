import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, state, style, animate, transition } from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
//import {Task} from '../../../Task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
        // animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
        animate(200, style({transform: 'translateY(100%)'}))
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
    registerForm: FormGroup;
    
    constructor(private authService:AuthService, public formBuilder: FormBuilder){
        this.registerForm = formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            password2: ['', Validators.required],
            
        });
    }

    isValid(field: string) {
        let formField = this.registerForm.get(field);
        console.log(formField.valid);
        return formField.valid || formField.pristine;
    }
    
    ngOnInit() { }

    submit(model) {
        console.log(this.username); 
        this.authService.register(model.username, model.password, model.email, model.password2).then(() => {
            this.authService.getCurrentUser();
            this.close();
        });
    }

    close() {
        this.registerForm.reset();
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }
    
    
}
