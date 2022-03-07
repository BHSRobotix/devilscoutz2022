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

const routes: Routes = [
  { path: 'menu', component: MainMenuComponent,
    canActivate: [ AuthGuard ],
    resolve: {
      // scoutId: ResolveAccountId
    },
  },
  { path: 'matchScoutingMenu', component: MatchScoutingMenuComponent, canActivate: [ AuthGuard ] },
  { path: 'scoutMatch', component: ScoutMatchComponent, canActivate: [ AuthGuard ] },
  { path: 'driverFeedback', component: DriverFeedbackComponent, canActivate: [ AuthGuard ] },
  { path: 'reports/teamList', component: TeamListComponent, canActivate: [ AuthGuard ] },
  { path: 'reports', component: ReportsComponent, canActivate: [ AuthGuard ] },
  { path: 'admin', component: AdminComponent, canActivate: [ AuthGuard ] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'menu' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
