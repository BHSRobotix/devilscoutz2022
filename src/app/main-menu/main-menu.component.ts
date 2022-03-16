import { Component, OnInit } from '@angular/core';
import { TheBlueAllianceService } from '../services/tba/the-blue-alliance.service';
import { AuthService, ScoutingUser } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ConfigService, ScoutingConfig } from '../services/firebase/config.service';
import { EventsService } from '../services/firebase/events.service';
import { TbaSimpleEvent } from '../services/tba/the-blue-alliance.types';
import firebase from 'firebase';
import { MatchesService } from '../services/firebase/matches.service';

@Component({
  selector: 'dbtz-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  user: ScoutingUser | undefined;
  user$: BehaviorSubject<ScoutingUser> | undefined;

  hasMatchSchedule = true;

  constructor(
    private tba: TheBlueAllianceService,
    private authService: AuthService,
    private configService: ConfigService,
    private eventsService: EventsService,
    private matchesService: MatchesService,
    private router: Router) { }

  ngOnInit(): void {
    this.user$ = this.authService.loggedInUser;
    this.user$.subscribe({
      next: (val) => {
        this.user = val;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  get isAdmin(): boolean {
    return this.user?.role === 'admin';
  }

  updateEvent(evtKey: string): void {
    // Figure out if there is a match schedule yet
    this.matchesService.getQualificationMatchesFromEvent(evtKey)
      .subscribe((snapshot) => {
        this.hasMatchSchedule = !snapshot.empty;
        },
        (error) => {
          console.log('Error getting documents: ', error);
        });
  }

  logout(): void {
    this.authService.doLogout();
    this.router.navigate(['login']);
  }
}
