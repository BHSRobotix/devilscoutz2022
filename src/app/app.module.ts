import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScoutCompLibModule } from './scout-comp-lib/scout-comp-lib.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatchScoutingMenuComponent } from './match-scouting/match-scouting-menu/match-scouting-menu.component';
import { ScoutMatchComponent } from './match-scouting/scout-match/scout-match.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportsComponent } from './reports/reports.component';
import { DriverFeedbackComponent } from './driver-feedback/driver-feedback.component';
import { AdminComponent } from './admin/admin.component';
import { TeamListComponent } from './reports/team-list/team-list.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { EventSelectorComponent } from './shared/event-selector/event-selector.component';
import { SingleMatchMenuComponent } from './match-scouting/match-scouting-menu/single-match-menu/single-match-menu.component';
import { TeamSummaryComponent } from './reports/team-summary/team-summary.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationComponent } from './shared/notification/notification.component';
import { NoDataRowComponent } from './shared/no-data-row/no-data-row.component';
import { ProfileComponent } from './profile/profile.component';
import { TeamStatsComponent } from './reports/team-stats/team-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    MatchScoutingMenuComponent,
    ScoutMatchComponent,
    ReportsComponent,
    DriverFeedbackComponent,
    AdminComponent,
    TeamListComponent,
    LoginComponent,
    ToolbarComponent,
    EventSelectorComponent,
    SingleMatchMenuComponent,
    TeamSummaryComponent,
    NotificationComponent,
    NoDataRowComponent,
    ProfileComponent,
    TeamStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    FontAwesomeModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScoutCompLibModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
