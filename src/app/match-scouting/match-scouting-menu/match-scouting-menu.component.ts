import { Component, OnInit } from '@angular/core';
import { TheBlueAllianceService } from '../../services/tba/the-blue-alliance.service';
import { TbaSimpleMatch } from '../../services/tba/the-blue-alliance.types';
import { MatchesService } from '../../services/firebase/matches.service';

@Component({
  selector: 'dbtz-match-scouting-menu',
  templateUrl: './match-scouting-menu.component.html',
  styleUrls: ['./match-scouting-menu.component.scss']
})
export class MatchScoutingMenuComponent implements OnInit {

  matches: TbaSimpleMatch[] = [];

  constructor(private tba: TheBlueAllianceService,
              private matchesService: MatchesService) { }

  ngOnInit(): void {
    // this.tba.getMatchesAtEvent('2019nhgrs').subscribe(result => {
    //     this.matches = result;
    //   },
    //   error => {
    //     console.log(error);
    //   });
  }

  updateEvent(eventKey: string): void {
    this.matches = [];
    this.matchesService.getQualificationMatchesFromEvent(eventKey)
      .subscribe((snapshot) => {
          snapshot.forEach((doc: any) => {
            this.matches.push(doc.data());
          });
          this.matches.sort(
            (a, b) =>
              a.match_number > b.match_number ? 1 : -1);
          console.log(this.matches);
        },
        (error) => {
          console.log('Error getting documents: ', error);
        });
  }

}
