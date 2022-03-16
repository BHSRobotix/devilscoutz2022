import { Component, OnInit } from '@angular/core';
import { TheBlueAllianceService } from '../services/tba/the-blue-alliance.service';
import { AuthService, ScoutingUser } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { TbaSimpleEvent, TbaSimpleMatch } from '../services/tba/the-blue-alliance.types';
import { MatchesService } from '../services/firebase/matches.service';
import { EventsService } from '../services/firebase/events.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'dbtz-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentEvent: string;
  localEvents: TbaSimpleEvent[] = [];

  user: ScoutingUser | undefined;
  user$: BehaviorSubject<ScoutingUser> | undefined;

  constructor(
    private tba: TheBlueAllianceService,
    private firestore: AngularFirestore,
    private matchesService: MatchesService,
    private eventsService: EventsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentEvent = '';
  }

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

    this.eventsService.getEventsFromDistrict('ne')
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          this.localEvents.push(doc.data() as TbaSimpleEvent);
        });
        this.localEvents.sort((a: TbaSimpleEvent, b: TbaSimpleEvent) =>
          a.start_date > b.start_date ? 1 : -1
        )
      },
      (error) => {
        console.log('Error getting documents: ', error);
      });
  }

  get isAdmin(): boolean {
    return this.user?.role === 'admin';
  }

  get isLeadScout(): boolean {
    return this.user?.role === 'lead-scout';
  }

  testService(eventKey: string): void {
    this.matchesService.getQualificationMatchesFromEvent(eventKey)
      .subscribe((snapshot) => {
          snapshot.forEach((doc: any) => {
            console.log('qual match', doc.data());
          });
        },
        (error) => {
          console.log('Error getting documents: ', error);
        });
  }

  getTeamMatchesFromEvent(teamKey: string, eventKey: string): void {
    this.matchesService.getTeamMatchesFromEvent(teamKey, eventKey)
      .subscribe(([blueSnapshot, redSnapshot]) => {
          blueSnapshot.forEach((doc: any) => {
            console.log('not service blue', doc.data());
          });
          redSnapshot.forEach((doc: any) => {
            console.log('not service red', doc.data());
          });
        },
        (error) => {
          console.log('Error getting documents: ', error);
        });
  }

  updateDistrictEvents(): void {
    this.tba.getDistrictEvents().subscribe(events => {
        this.eventsService.postEvents(events);
      },
      error => {
        console.log(error);
      });
  }

  updateMatchesAtCurrentEvent(): void {
    // @ts-ignore
    console.log('updateMatchesAtEvent ', this.currentEvent);
    this.tba.getMatchesAtEvent(this.currentEvent).subscribe(result => {
        console.log(result);
        result.forEach((match: TbaSimpleMatch) => {
          this.firestore.collection('matches').doc(match.key).set(match)
            .then(() => {
              console.log('Document successfully written!');
            })
            .catch((error) => {
              console.error('Error writing document: ', error);
            });
        });
      },
      error => {
        console.log(error);
      });
  }

  eventDisplayName(eventData: TbaSimpleEvent): string {
    return eventData.name.startsWith('NE District') ?
      eventData.name.slice(12) :  // most events start with NE District
      eventData.name.slice(18);   // district champs starts with New England FIRST
  }



  // DELETING
//   db.collection("cities").doc("DC").delete().then(() => {
//     console.log("Document successfully deleted!");
//   }).catch((error) => {
//     console.error("Error removing document: ", error);
//   });

}
