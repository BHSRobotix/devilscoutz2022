import { Component, OnInit } from '@angular/core';
import { EventTeamsService } from '../../services/firebase/event-teams.service';

@Component({
  selector: 'dbtz-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teams: any[] = [];
  constructor(private readonly eventTeamsService: EventTeamsService) { }

  ngOnInit(): void {
    this.eventTeamsService.getTeamsAtEvent('2022nhgrs')
    .subscribe((snapshot) => {
      snapshot.forEach((doc: any) => {
        this.teams.push(doc.data());
      });
    // this.matches.sort(
    //   (a, b) =>
    //     a.match_number > b.match_number ? 1 : -1);
    // console.log(this.matches);
    },
    (error) => {
      console.log('Error getting documents: ', error);
    });
  }

}
