import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MatchScoutingMenuComponent } from './match-scouting/match-scouting-menu/match-scouting-menu.component';
import { ScoutMatchComponent } from './match-scouting/scout-match/scout-match.component';
import { TeamListComponent } from './reports/team-list/team-list.component';
import { ReportsComponent } from './reports/reports.component';
import { AdminComponent } from './admin/admin.component';
import { DriverFeedbackComponent } from './driver-feedback/driver-feedback.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MainMenuComponent,
    resolve: {
      // scoutId: ResolveAccountId
    },
  },
  { path: 'matchScoutingMenu', component: MatchScoutingMenuComponent },
  { path: 'scoutMatch', component: ScoutMatchComponent },
  { path: 'driverFeedback', component: DriverFeedbackComponent },
  { path: 'reports/teamList', component: TeamListComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: 'menu' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
