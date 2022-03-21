import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService, ScoutingUser } from '../../services/auth/auth.service';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { PerformancesService, ScoutedPerformance } from '../../services/firebase/performances.service';
import { matchNumFromMatchId } from '../../shared/util.methods';

type SubmissionStatus = 'before-submit' | 'waiting' | 'after-submit';

@Component({
  selector: 'dbtz-scout-match',
  templateUrl: './scout-match.component.html',
  styleUrls: ['./scout-match.component.scss']
})
export class ScoutMatchComponent implements OnDestroy, OnInit {

  form!: FormGroup;
  loadedData = false;
  scout: ScoutingUser | undefined;

  submissionStatus: SubmissionStatus = 'before-submit';
  submittedData: any;

  matchNumFromMatchId = matchNumFromMatchId;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private toolbarService: ToolbarService,
              private auth: AuthService,
              private performancesService: PerformancesService,
              private store: AngularFirestore) { }

  ngOnInit(): void {
    // Turn off the active links in the toolbar so that the user doesn't accidentally leave this screen
    this.toolbarService.activeLinks = false;
    // Get the match and team from the params
    const matchId: string = this.route.snapshot.queryParamMap.get('m') as string;
    const team: string = this.route.snapshot.queryParamMap.get('tm') as string;
    // Get the scoutId
    this.auth.loggedInUser.subscribe({
      next: (val) => {
        this.scout = val;
        if (!!matchId && !!team) {
          this.loadedData = true;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.form = this.formBuilder.group({
      matchId: [matchId, [Validators.required]],
      team: [team, [Validators.required]],
      scoutId: [this.scout?.uid, [Validators.required]],
      autoTaxi: [false, [Validators.required]],
      autoLowGoalsScored: [0, [Validators.required, Validators.min(0)]],
      autoHighGoalsScored: [0, [Validators.required, Validators.min(0)]],
      teleLowGoalsScored: [0, [Validators.required, Validators.min(0)]],
      teleHighGoalsScored: [0, [Validators.required, Validators.min(0)]],
      climbLevel: ['none', [Validators.required]]
    });

  }

  ngOnDestroy(): void {
    this.toolbarService.activeLinks = true;
  }

  submit(): void {
    const formVal: ScoutedPerformance = this.form.value;
    this.submissionStatus = 'waiting';
    this.performancesService.postScoutingReport(formVal).subscribe(
      () => {
        this.submissionStatus = 'after-submit';
        this.submittedData = formVal;
      },
      error => {
        console.error('Error posting data');
        // TODO - toast the user to try again?
        this.submissionStatus = 'before-submit';
      }
    );
  }

}
