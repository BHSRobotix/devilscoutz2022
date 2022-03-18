import { Component, OnInit } from '@angular/core';
import { TheBlueAllianceService } from '../../services/tba/the-blue-alliance.service';
import { TbaSimpleMatch } from '../../services/tba/the-blue-alliance.types';
import { MatchesService } from '../../services/firebase/matches.service';
import { MatchScoutingMenuStateService } from './match-scouting-menu-state.service';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dbtz-match-scouting-menu',
  templateUrl: './match-scouting-menu.component.html',
  styleUrls: ['./match-scouting-menu.component.scss']
})
export class MatchScoutingMenuComponent implements OnInit {

  faRecycle = faRecycle;

  matches: TbaSimpleMatch[] = [];
  viewableMatches: TbaSimpleMatch[] = [];
  viewMatches = 'all';
  lastMatchScouted = 0;
  loading = false;
  errorLoading = false;

  constructor(private stateService: MatchScoutingMenuStateService,
              private tba: TheBlueAllianceService,
              private matchesService: MatchesService) { }

  ngOnInit(): void {
    this.viewMatches = this.stateService.viewMatches;
    this.lastMatchScouted = this.stateService.lastMatchScouted;
  }

  // Note: The event selector's onInit emits the event that triggers this so it's
  // not necessary to call this in the ngOnInit as you might normally expect
  updateEvent(eventKey: string): void {
    this.matches = [];
    this.loading = true;
    this.matchesService.getQualificationMatchesFromEvent(eventKey)
      .subscribe((snapshot) => {
          snapshot.forEach((doc: any) => {
            this.matches.push(doc.data());
          });
          this.matches.sort(
            (a, b) =>
              a.match_number > b.match_number ? 1 : -1);
          this.updateViewableMatches();
          this.loading = false;
          this.errorLoading = false;
        },
        (error) => {
          console.log('Error getting documents: ', error);
          this.loading = false;
          this.errorLoading = true;
        });
  }

  updateViewMatchesToggle(): void {
    this.stateService.viewMatches = this.viewMatches;
    this.updateViewableMatches();
  }

  updateViewableMatches(): void {
    this.viewMatches === 'all' ?
      this.viewableMatches = this.matches :
      this.viewableMatches = this.matches.filter(m => m.match_number >= this.lastMatchScouted);
    console.log(this.viewableMatches.length);
  }

  resetLastMatchScouted(): void {
    this.lastMatchScouted = 0;
    this.stateService.lastMatchScouted = 0;
    this.updateViewableMatches();
  }

}
