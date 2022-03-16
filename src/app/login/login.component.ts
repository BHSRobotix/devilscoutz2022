import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dbtz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  doGoogleLogin(): void {
    this.authService.doGoogleLogin().then(result => {
      this.router.navigateByUrl('/menu');
    });
  }

  doUnauthenticatedLogin(): void {
    this.authService.doUnauthenticatedLogin();
    this.router.navigateByUrl('/menu');
  }

  logout(): void {
    this.authService.doLogout();
  }
}
