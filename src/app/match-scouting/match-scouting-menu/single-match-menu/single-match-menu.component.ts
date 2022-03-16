import { Component, Input, OnInit } from '@angular/core';
import { TbaSimpleMatch } from '../../../services/tba/the-blue-alliance.types';

@Component({
  selector: 'dbtz-single-match-menu',
  templateUrl: './single-match-menu.component.html',
  styleUrls: ['./single-match-menu.component.scss']
})
export class SingleMatchMenuComponent implements OnInit {

  @Input() match!: TbaSimpleMatch;

  constructor() { }

  ngOnInit(): void {
    console.log(this.match);
  }

  blueQueryParams(index: number): any {
    return { m: this.match.key, tm: this.blueTeamNumber(index) };
  }

  blueTeamNumber(index: number): string {
    return this.match.alliances.blue.team_keys[index].slice(3);  // get rid of leading 'frc'
  }

  redQueryParams(index: number): any {
    return { m: this.match.key, tm: this.redTeamNumber(index) };
  }

  redTeamNumber(index: number): string {
    return this.match.alliances.red.team_keys[index].slice(3);  // get rid of leading 'frc'
  }

}
