import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { API_LIST } from '../variables/api-list';
import { SignIn, SignUp } from '../variables/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private apiService = inject(ApiService)
  private apiList = API_LIST

  showLogin = true;
  message = false;

  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role_id: [null, Validators.required]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    if (this.loginForm.valid) {
      const logInDetails: SignIn = this.loginForm.value;

      this.apiService.post(this.apiList.LOGIN_VERIFY, logInDetails).subscribe({
        next: (res: any) => {
          if (res.status && res.token) {
            localStorage.setItem('authToken', res.token);
            this.router.navigate(['/dashboard', res.user.role_id]);
          } else {
            console.error('Invalid Login');
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      });
    }
  }

  onSignup() {
    if (this.signupForm.valid) {
      const signUpDetails: SignUp = this.signupForm.value;

      if (typeof signUpDetails.role_id !== 'number') {
        console.error('Role must be a number');
        return;
      }

      this.apiService.post(this.apiList.LOGIN_CREATE, signUpDetails).subscribe({
        next: (res: any) => {
          if (res.status) {
            this.message = true
            this.showLogin = true
          } else {
            console.error('Invalid Signup');
          }
        },
        error: (err) => {
          console.error('Signup failed:', err);
        }
      });
    }
  }

}

