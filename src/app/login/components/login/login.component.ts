import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login:FormGroup;
  token = false;

    constructor(
      private usersSvc:UsersService,
      private formBuilder: FormBuilder, 
      private router:Router, 
      private route:ActivatedRoute
      ) { 
      this.login = this.formBuilder.group({
        email: ['',[Validators.required,Validators.email]],
        password: ['',Validators.required],
      })
  }

  ngOnInit(): void {
/*     this.usersSvc.getAllUsers().subscribe(res=>{
      console.log(res);
    }) */
  }


  goToHome(){
    if(this.login.invalid){
      this.login.markAllAsTouched();
    }else{
      this.token = true;
      localStorage.setItem('Token','asd')
      this.router.navigate([''])
    }
    
  }

}
