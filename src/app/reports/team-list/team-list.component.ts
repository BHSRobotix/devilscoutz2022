import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EventTeam, EventTeamsService } from '../../services/firebase/event-teams.service';
import { getLocation } from '../../shared/util.methods';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dbtz-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements AfterViewInit, OnInit {

  faExternalLinkAlt = faExternalLinkAlt;

  currentEvent = '';
  loading = false;
  teams: EventTeam[] = [];
  dataSource = new MatTableDataSource<EventTeam>([]);
  displayedColumns: string[] = ['team_number', 'nickname', 'location', 'url'];

  getLocation = getLocation;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly eventTeamsService: EventTeamsService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  updateEvent(eventKey: string): void {
    this.currentEvent = eventKey;
    this.loading = true;
    this.eventTeamsService.getTeamsAtEvent(eventKey)
      .subscribe((snapshot) => {
          this.teams = [];
          snapshot.forEach((doc: any) => {
            this.teams.push(doc.data());
          });
          this.teams.sort(
            (a, b) =>
              a.key.length !== b.key.length ?
                a.key.length - b.key.length :
                a.key > b.key ? 1 : -1);
          this.dataSource.data = this.teams;
          this.loading = false;
        },
        (error) => {
          console.log('Error getting documents: ', error);
          this.loading = false;
        });
  }

}
