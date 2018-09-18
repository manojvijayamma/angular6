import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';


import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';

import { UserService } from '../shared/services/user.service';
import { AlertService } from '../shared/services/alert.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    
    loginFrm: FormGroup; 
    isLoginError : boolean = false;

    @Input() hideSpinner: boolean;
    @Output() hideSpinnerChanged: EventEmitter<boolean> = new EventEmitter();
    

    constructor(private frmBuilder: FormBuilder, public router: Router, private userService : UserService,
    private alertService : AlertService) {}
  
    ngOnInit() {        
        this.loginFrm = this.frmBuilder.group({            
            email:[null, [Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
            password:["", [Validators.required]]           
     
        });

    }

    onLoggedin() {
        if(this.loginFrm.value.email==''){
            this.alertService.error("Enter email");
            return false;
        }
        document.getElementById("spinner").style.display="block";
        console.log(this.loginFrm.value);
        var userData=this.loginFrm.value;
        this.userService.userAuthentication(userData.email,userData.password).subscribe((data : any)=>{
            console.log(data);
            if(data.result.token){
                localStorage.setItem('userToken',data.result.token);
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigate(['/dashboard']);
            }  
            else{
                this.isLoginError = true;
            }  
          },
          (err : HttpErrorResponse)=>{
            this.isLoginError = true;
          });


        localStorage.setItem('isLoggedin', 'true');
    }

    ngAfterViewInit(){
        document.getElementById("spinner").style.display="none";
    }

    
}
