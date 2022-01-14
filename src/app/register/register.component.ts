import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modalError/modal/modal.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  login:FormGroup;
  token;
  icon = 'visibility'
  showPassword = false;

  constructor(
      private loginSvc:LoginService,
      private formBuilder: FormBuilder, 
      private router:Router, 
      public dialog:MatDialog,
      ) { 
      this.login = this.formBuilder.group({
        correo: ['',[Validators.required,Validators.email]],
        contraseña: ['',Validators.required],
      })
  }

  ngOnInit(): void {}

  showPass(){
  this.showPassword =! this.showPassword;
  if(this.icon == 'visibility'){
    this.icon = 'visibility_off';
  }else{
    this.icon = 'visibility';
  }
  }

  //Getters
  get emailField(){
    return this.login.get('correo');
  }
  get passField(){
    return this.login.get('contraseña');
  }

  //Errors Fields
  errorEmail(){
    if (this.emailField?.hasError('required')) {
      return 'Debes escribir tu email';
    }
    return this.emailField?.hasError('email') ? 'No es un email válido' : '';
  } 

  goToHome(){
    if(this.login.invalid){
      this.login.markAllAsTouched();
    }else{
      this.loginSvc.login(this.login.value).subscribe(
        res=>{
          this.token = res;
          localStorage.setItem('token',this.token)
          this.router.navigate(['/home'])
        },
        err=>{
            const dialogRef = this.dialog.open(ModalComponent,{
              disableClose:false,
              data:err
            });
          }
      )  
    }
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }
}

/* {
    "nombre":"mario",
    "correo":"test4@gmail.com",
    "contraseña":"123456",
    "rol":"USER_ROLE"
}
 */