import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService, ScoutingUser } from '../../services/auth/auth.service';

@Component({
  selector: 'dbtz-scout-match',
  templateUrl: './scout-match.component.html',
  styleUrls: ['./scout-match.component.scss']
})
export class ScoutMatchComponent implements OnInit {

  form!: FormGroup;
  loadedData = false;
  scout: ScoutingUser | undefined;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private auth: AuthService,
              private store: AngularFirestore) { }

  ngOnInit(): void {
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
      autoLowGoalsScored: [0, [Validators.required, Validators.min(0)]],
      autoHighGoalsScored: [0, [Validators.required, Validators.min(0)]],
      teleLowGoalsScored: [0, [Validators.required, Validators.min(0)]],
      teleHighGoalsScored: [0, [Validators.required, Validators.min(0)]]
    });

  }

  submit(): void {
    console.log(this.form.value);
    // this.store.collection('performances').add(this.form.value);
  }

}
