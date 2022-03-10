import { Component, OnInit } from '@angular/core';
import { TheBlueAllianceService } from '../services/tba/the-blue-alliance.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dbtz-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(
    private tba: TheBlueAllianceService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.doLogout();
    this.router.navigate(['login']);
  }
}
