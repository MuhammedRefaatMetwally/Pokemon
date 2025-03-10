import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private _Router:Router){}
  errorMsg:any;
  registerForm= new FormGroup({
    name: new FormControl('',[ Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    rePassword: new FormControl(''),
    gender: new FormControl('', Validators.required)

  },{validators:[this.confirmPassword]} as FormControlOptions)
    //getters form controls
    get name(){
      return this.registerForm.controls.name;
    }
    get email(){
      return this.registerForm.controls.email;
    }
    get password(){
      return this.registerForm.controls.password;
    }
    get rePassword(){
      return this.registerForm.controls.rePassword;
    }
    get gender(){
      return this.registerForm.controls.gender;
    }
  // check Password same as repassword
  confirmPassword(group:FormGroup):void{
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if(rePassword?.value ==""){
      rePassword?.setErrors({required:true})
      
    }
    else if(password?.value!= rePassword?.value){
      rePassword?.setErrors({mismatch: true});
    }
  }
  // localStorage
  registerUser() {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let existingUser = users.find((user: any) => user.email === this.email.value);

    if (existingUser) {
    this.errorMsg = 'User already exists!';
    return;
    }
    let newUser = {
      name: this.name.value,  
      email: this.email.value,  
      password: this.password.value,  
      rePassword: this.rePassword.value, 
      gender: this.gender.value,
      orders: []
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    this.registerForm.reset();
    this.errorMsg = '';
    this._Router.navigate(['/login'])
    // localStorage.clear();
    // console.log(users)
}

  }

