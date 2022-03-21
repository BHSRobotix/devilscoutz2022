import { Component, OnInit } from '@angular/core';
import { AuthService, ScoutingUser } from '../services/auth/auth.service';
import { ScoutingUsersService } from '../services/firebase/scouting-users.service';
import { BehaviorSubject } from 'rxjs';
import { faEdit, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dbtz-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: ScoutingUser | undefined;
  user$: BehaviorSubject<ScoutingUser> | undefined;

  faEdit = faEdit;
  faCheckSquare = faCheckSquare;

  isEditingNickname = false;
  newNickname = '';

  constructor(private auth: AuthService,
              private scoutingUsersService: ScoutingUsersService) { }

  ngOnInit(): void {
    this.user$ = this.auth.loggedInUser;
    this.user$.subscribe({
      next: (val) => {
        this.user = val;
        this.newNickname = this.user?.nickname || '';
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  startEditNickname(): void {
    this.isEditingNickname = true;
  }

  finishEditNickname(): void {
    this.scoutingUsersService.updateNickname(this.user?.uid || '', this.newNickname);
    this.isEditingNickname = false;
  }

}
