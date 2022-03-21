import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EventTeam, EventTeamsService } from '../../services/firebase/event-teams.service';
import { ClimbLevel, PerformancesService, ScoutedPerformance, StoredPerformance } from '../../services/firebase/performances.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {
  faTaxi, faArrowDown, faArrowUp, faBars
} from '@fortawesome/free-solid-svg-icons';
import { TheBlueAllianceService } from '../../services/tba/the-blue-alliance.service';
import { TbaEventRanking, TbaRankingResponse } from '../../services/tba/the-blue-alliance.types';

const CLIMB_LEVELS: ClimbLevel[] = [ 'none', 'low', 'medium', 'high', 'traversal' ];

export interface TeamStatsSummary {
  teamNumber: string;
  matchesScouted: number;
  wins: number;
  losses: number;
  ties: number;
  rankingPoints: number;
  avgRankingPoints: number;
  avgTaxi: number;
  avgAutoLow: number;
  avgAutoHigh: number;
  avgTeleLow: number;
  avgTeleHigh: number;
  avgClimbLevel: number;
}

@Component({
  selector: 'dbtz-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.scss']
})
export class TeamStatsComponent implements AfterViewInit, OnInit {

  // expose the icons being usesd
  faTaxi = faTaxi;
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;
  faBars = faBars;

  currentEvent = '';
  loading = false;
  summary: TeamStatsSummary[] = [];
  dataSource = new MatTableDataSource<TeamStatsSummary>([]);
  displayedMetaColumns: string[] = [ 'spanner', 'auto', 'tele-op' ];
  displayedDataColumns: string[] = [
    'teamNumber', 'rankingPoints', 'record',
    'avgTaxi', 'avgAutoLow', 'avgAutoHigh',
    'avgTeleLow', 'avgTeleHigh', 'avgClimbLevel'
  ];
  @ViewChild(MatSort) sort!: MatSort;

  // These objects are used in compiling the data
  scoutedPerformancesByTeam!: { [key: string]: StoredPerformance[] };

  constructor(private readonly eventTeamsService: EventTeamsService,
              private readonly perfomancesService: PerformancesService,
              private readonly tba: TheBlueAllianceService) {
    this.resetScoutedPerformancesHash();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  updateEvent(eventKey: string): void {
    this.resetScoutedPerformancesHash();
    this.currentEvent = eventKey;
    this.loading = true;
    this.perfomancesService.getScoutingReportsForEvent(eventKey)
      .subscribe((snapshot) => {
          snapshot.forEach((doc: any) => {
            const perf: StoredPerformance = doc.data() as StoredPerformance;
            if (!this.scoutedPerformancesByTeam[perf.team]) {
              this.scoutedPerformancesByTeam[perf.team] = [];
            }
            this.scoutedPerformancesByTeam[perf.team].push(perf);
          });
          this.createSummaryTable();
          this.loading = false;
        },
        (error) => {
          console.log('Error getting documents: ', error);
          this.loading = false;
        });
  }

  createSummaryTable(): void {
    // TODO - replace this call to TBA with admin usage of TBA and new service in firebase
    //  for the huddled masses
    this.tba.getEventRankings(this.currentEvent).subscribe(
      (resp: TbaRankingResponse) => {
        this.summary = [];
        resp.rankings.forEach((ranking: TbaEventRanking) => {
          const teamNumber: string = ranking.team_key.slice(3); // slice off leading 'frc'
          const sum: TeamStatsSummary = {
            teamNumber,
            matchesScouted: this.getNumberMatchesScouted(teamNumber),
            wins: ranking.record.wins,
            losses: ranking.record.losses,
            ties: ranking.record.ties,
            rankingPoints: ranking.extra_stats[0],
            avgRankingPoints: ranking.sort_orders[0],
            avgTaxi: this.getScoutedPerformanceAvg(teamNumber, 'autoTaxi'),
            avgAutoLow: this.getScoutedPerformanceAvg(teamNumber, 'autoLowGoalsScored'),
            avgAutoHigh: this.getScoutedPerformanceAvg(teamNumber, 'autoHighGoalsScored'),
            avgTeleLow: this.getScoutedPerformanceAvg(teamNumber, 'teleLowGoalsScored'),
            avgTeleHigh: this.getScoutedPerformanceAvg(teamNumber, 'teleHighGoalsScored'),
            avgClimbLevel: this.getScoutedPerformanceAvg(teamNumber, 'climbLevel')
          };
          this.summary.push(sum);
        });
        this.dataSource.data = this.summary;
      },
      error => {
        console.log('Error pulling rankings from TBA: ', error);
      }
    );
  }

  resetScoutedPerformancesHash(): void {
    // There's a better way, right??
    this.scoutedPerformancesByTeam =  { z: [] };
  }

  getNumberMatchesScouted(teamNumber: string): number {
    return !!this.scoutedPerformancesByTeam[teamNumber] ?
      this.scoutedPerformancesByTeam[teamNumber].length : 0;
  }

  getScoutedPerformanceAvg(teamNumber: string, category: string): number {
    // TODO - update this to average the reports from the same match together before
    //  averaging them as one report together with the rest of the reports
    if (!this.scoutedPerformancesByTeam[teamNumber]) {
      return -1;
    }

    let total = 0;
    this.scoutedPerformancesByTeam[teamNumber].forEach((perf: StoredPerformance) => {
      let val = 0;
      if (category === 'autoTaxi') {
        val = perf.autoTaxi ? 1 : 0;
      } else if (category === 'climbLevel') {
        val = CLIMB_LEVELS.indexOf(perf.climbLevel);
      } else {
        // @ts-ignore
        val = perf[category];
      }
      total += val;
    });
    return total / this.scoutedPerformancesByTeam[teamNumber].length;
  }

}
