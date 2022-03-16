import { Component, OnInit } from '@angular/core';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { AuthService, ScoutingUser, User } from '../services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'dbtz-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  title = 'devilscoutz2022';
  faRobot = faRobot;
  user: ScoutingUser | undefined;
  user$: BehaviorSubject<ScoutingUser> | undefined;

  constructor(private readonly auth: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.auth.loggedInUser;
    this.user$.subscribe({
      next: (val) => {
        this.user = val;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  get displayName(): string {
    return this.user?.nickname || this.user?.displayName || 'Guest';
  }

}
