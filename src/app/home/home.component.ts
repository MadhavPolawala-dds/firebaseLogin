import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  get currentUser() {
    return this.authService.currentUserSig();
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
          password: '',
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
    });
  }

  logout() {
    const confirmLogout = window.confirm(
      `Are you sure you want to Logout ${this.currentUser?.username} ?`
    );

    if (confirmLogout) {
      this.authService.logout();
      this.router.navigateByUrl('login');
    }
  }
}
