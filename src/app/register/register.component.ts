import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor (private fb:FormBuilder, private api:ApiService , private router:Router) {}

  registerForm = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]{3,}')]],
    email:["",[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]{4,}')]]
  })

  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm);
      this.api.registerAPI(this.registerForm.value).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert('Registered Successfully')
          this.router.navigateByUrl('/login')
        },
        error:(err:any)=>{
          console.log(err);
          alert('Something went wrong')
        }
      })

    }
  }
}
