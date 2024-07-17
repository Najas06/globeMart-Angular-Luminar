import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {  

  constructor (private fb:FormBuilder, private api:ApiService , private router:Router) {}

  loginForm = this.fb.group({
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required]]
  })

  login(){
    if(this.loginForm.valid){
      this.api.loginAPI(this.loginForm.value).subscribe({
        next:(res:any)=>{
          sessionStorage.setItem('existingUser',JSON.stringify(res.existingUser))
          sessionStorage.setItem('token',res.token)
          this.api.getWishListCount()
          alert('Login Successfull')
          this.router.navigateByUrl('/')
        },
        error:(err:any)=>{
          console.log(err.error);
        }
      })
    }
  }

}
