import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _Router: Router) { }
  errorMsg: any;
  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),

  })
  //getters form control
  get email() {
    return this.login.controls.email;
  }
  get password() {
    return this.login.controls.password;
  }
  // login
  loginUser() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const enteredEmail = this.email.value;
    const enteredPassword = this.password.value;
    const userExists = users.find((user: any) => user.email === enteredEmail && user.password === enteredPassword);
    if (userExists) {
      localStorage.setItem('loggedInUser', JSON.stringify(userExists));
      this._Router.navigate(['/pokemon']);
    } else {

      this.errorMsg = 'Incorrect email or password.';
    }
  }
}
