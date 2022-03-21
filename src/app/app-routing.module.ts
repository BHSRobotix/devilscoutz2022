import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MatchScoutingMenuComponent } from './match-scouting/match-scouting-menu/match-scouting-menu.component';
import { ScoutMatchComponent } from './match-scouting/scout-match/scout-match.component';
import { TeamListComponent } from './reports/team-list/team-list.component';
import { ReportsComponent } from './reports/reports.component';
import { AdminComponent } from './admin/admin.component';
import { DriverFeedbackComponent } from './driver-feedback/driver-feedback.component';
import { AuthGuard } from './services/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { ConfigGuard } from './services/firebase/config.guard';
import { TeamSummaryComponent } from './reports/team-summary/team-summary.component';
import { ProfileComponent } from './profile/profile.component';
import { TeamStatsComponent } from './reports/team-stats/team-stats.component';

const routes: Routes = [
  { path: 'menu', component: MainMenuComponent,
    canActivate: [ AuthGuard ],
    resolve: {
      // scoutId: ResolveAccountId
    },
  },
  { path: 'matchScoutingMenu', component: MatchScoutingMenuComponent, canActivate: [ AuthGuard, ConfigGuard ] },
  { path: 'scoutMatch', component: ScoutMatchComponent, canActivate: [ AuthGuard, ConfigGuard ] },
  { path: 'driverFeedback', component: DriverFeedbackComponent, canActivate: [ AuthGuard, ConfigGuard ] },
  { path: 'reports/teamList', component: TeamListComponent, canActivate: [ AuthGuard, ConfigGuard ] },
  { path: 'reports/teamStats', component: TeamStatsComponent, canActivate: [ AuthGuard, ConfigGuard ] },
  { path: 'reports/teamSummary', component: TeamSummaryComponent, canActivate: [ AuthGuard, ConfigGuard ] },
  { path: 'reports', component: ReportsComponent, canActivate: [ AuthGuard ] },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] },
  { path: 'admin', component: AdminComponent, canActivate: [ AuthGuard, ConfigGuard ] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'menu' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
