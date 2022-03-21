import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventTeam, EventTeamsService } from '../../services/firebase/event-teams.service';
import { MatchesService } from '../../services/firebase/matches.service';
import { TbaSimpleEvent, TbaSimpleMatch } from '../../services/tba/the-blue-alliance.types';
import { ClimbLevel, PerformancesService, StoredPerformance } from '../../services/firebase/performances.service';
import { getLocation, shortenEventName } from 'src/app/shared/util.methods';
import { EventsService } from '../../services/firebase/events.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {
  faExternalLinkAlt, faCheckCircle, faMinusSquare,
  faTaxi, faArrowDown, faArrowUp, faBars, faUser
} from '@fortawesome/free-solid-svg-icons';
import { ScoutingUsersService, SimpleScoutingUser } from '../../services/firebase/scouting-users.service';

@Component({
  selector: 'dbtz-team-summary',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.scss']
})
export class TeamSummaryComponent implements AfterViewInit, OnInit {

  teamNumber = '';
  eventKey = '';

  allTeamEvents: string[] = [];  // event keys for all events this team is in
  teamData: EventTeam | undefined;

  matches: TbaSimpleMatch[] = [];
  performances: StoredPerformance[] = [];
  currentEvent: TbaSimpleEvent | undefined;

  scoutsHash: { [key: string]: SimpleScoutingUser | null } = { z: null };

  dataSource = new MatTableDataSource<TbaSimpleMatch>([]);
  displayedMetaColumns: string[] = [ 'spanner', 'auto', 'tele-op' ];
  displayedDataColumns: string[] = [
    'match_number', 'result', 'auto_taxi', 'auto_low', 'auto_high',
    'tele_low', 'tele_high', 'tele_climb', 'scout'
  ];

  @ViewChild(MatSort) sort!: MatSort;

  getLocation = getLocation;
  shortenEventName = shortenEventName;

  // expose the icons being usesd
  faExternalLinkAlt = faExternalLinkAlt;
  faCheckCircle = faCheckCircle;
  faMinusSquare = faMinusSquare;
  faTaxi = faTaxi;
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;
  faBars = faBars;
  faUser = faUser;

  constructor(private route: ActivatedRoute,
              private eventsService: EventsService,
              private eventTeamsService: EventTeamsService,
              private matchesService: MatchesService,
              private performancesService: PerformancesService,
              private scoutingUsersService: ScoutingUsersService,
              private store: AngularFirestore) { }

  ngOnInit(): void {
    // Get the team and event ids from the route
    this.teamNumber = this.route.snapshot.queryParamMap.get('tm') as string;
    this.eventKey = this.route.snapshot.queryParamMap.get('evt') as string;

    // Retrieve team data and all events they are in
    this.eventTeamsService.getEventsForTeam(this.teamNumber)
      .subscribe((snapshot) => {
          this.allTeamEvents = [];
          snapshot.forEach((doc: any) => {
            // the team data should be the same for all events
            this.teamData = doc.data();
            this.allTeamEvents.push(doc.data().eventKey);
          });
        },
        (error) => {
          console.log('Error getting documents: ', error);
        });

    // Retrieve the current event
    this.updateCurrentEvent();
    // Retrieve team matches at current event
    this.updateTeamMatchesFromEvent();
    // Retrieve team performances at current event
    this.updateTeamPerformancesFromEvent();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    setTimeout(() => {
      const uid = 'ldOz8cMiYTbBgElapJRoi3JzlBI3';
      console.log(this.scoutsHash[uid]?.nickname);
    }, 6000);
  }

  updateCurrentEvent(): void {
    this.eventsService.getEventByKey(this.eventKey)
      .subscribe(documentSnapshot => {
        this.currentEvent = documentSnapshot.data() as TbaSimpleEvent;
      },
          error => {
        console.error(`Error getting currentEvent: eventsService.getEventByKey(${this.eventKey})`);
      });
  }

  updateTeamMatchesFromEvent(): void {
    this.matchesService.getTeamMatchesFromEvent(this.teamNumber, this.eventKey)
      .subscribe(([blueSnapshot, redSnapshot]) => {
          blueSnapshot.forEach((doc: any) => {
            this.matches.push(doc.data());
          });
          redSnapshot.forEach((doc: any) => {
            this.matches.push(doc.data());
          });
          this.matches.sort((a, b) => a.match_number > b.match_number ? 1 : -1);
          this.dataSource.data = this.matches;
        },
        (error) => {
          console.log('Error getting documents: ', error);
        });
  }

  updateTeamPerformancesFromEvent(): void {
    this.performancesService.getScoutingReportsForTeamAtEvent(this.teamNumber, this.eventKey)
      .subscribe(snapshot => {
          snapshot.forEach((doc: any) => {
            const perf: StoredPerformance = doc.data();
            this.performances.push(perf);
            this.scoutingUsersService.getScoutingUser(perf.scoutId)
              .subscribe(snp2 => {
                snp2.forEach(doc2 => {
                  this.scoutsHash[perf.scoutId] = doc2.data() as SimpleScoutingUser;
                });
              },
                (error) => {
                  console.log('Error getting scout data: ', error);
                });
          });
        },
        (error) => {
          console.log('Error getting documents: ', error);
        });
  }

  getMatchAlliance(match: TbaSimpleMatch): string {
    return match.alliances.red.team_keys.includes(`frc${ this.teamNumber }`) ? 'red' : 'blue';
  }

  getMatchResult(match: TbaSimpleMatch): string {
    // Matches might not have been played yet
    if (!!match.winning_alliance) {
      return match.winning_alliance === this.getMatchAlliance(match) ? 'W' : 'L';
    }
    return '';
  }

  getScoutedData(matchKey: string, field: string): any {
    const perfs = this.performances.filter(p => p.matchId === matchKey);
    // TODO - roll up multiple matches into a summary - but for now, just show the first report
    if (perfs.length >= 1) {
      const p = perfs[0];
      // @ts-ignore
      return p[field];
    }
    // The match has not been scouted
    return '';
  }

}
