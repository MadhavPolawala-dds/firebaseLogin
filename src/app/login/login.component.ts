import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { HeaderComponent } from '../components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  erroMsg: string | null = null;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get emailValidation() {
    return this.loginForm.get('email');
  }

  get passwordValidation() {
    return this.loginForm.get('password');
  }

  login() {
    console.log(this.loginForm.value);
    const rawForm = this.loginForm.getRawValue();
    const email = rawForm.email ?? '';
    const password = rawForm.password ?? '';
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('home');
        //display toast message "Login Successful"
      },
      error: (err) => {
        this.erroMsg = err.code;
      },
    });
  }
}
