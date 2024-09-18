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

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, HeaderComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  user: [] = [];
  erroMsg: string | null = null;

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get usernameValidation() {
    return this.signupForm.get('username');
  }
  get emailValidation() {
    return this.signupForm.get('email');
  }

  get passwordValidation() {
    return this.signupForm.get('password');
  }

  signup() {
    console.log(this.signupForm.value);
    const rawForm = this.signupForm.getRawValue();
    const username = rawForm.username ?? '';
    const email = rawForm.email ?? '';
    const password = rawForm.password ?? '';
    this.authService.register(username, email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.erroMsg = err.code;
      },
    });
  }
}
