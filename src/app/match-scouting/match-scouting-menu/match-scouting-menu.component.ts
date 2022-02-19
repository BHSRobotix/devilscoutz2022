import { Component, OnInit } from '@angular/core';
import { TheBlueAllianceService } from '../../services/tba/the-blue-alliance.service';

@Component({
  selector: 'dbtz-match-scouting-menu',
  templateUrl: './match-scouting-menu.component.html',
  styleUrls: ['./match-scouting-menu.component.scss']
})
export class MatchScoutingMenuComponent implements OnInit {

  constructor(private tba: TheBlueAllianceService) { }

  ngOnInit(): void {
    this.tba.getMatchesAtEvent('2019nhgrs').subscribe(result => {
        console.log(result);
      },
      error => {
        console.log(error);
      });
  }

}
