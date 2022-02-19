import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dbtz-scout-match',
  templateUrl: './scout-match.component.html',
  styleUrls: ['./scout-match.component.scss']
})
export class ScoutMatchComponent implements OnInit {

  form!: FormGroup;
  loadedData = false;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private store: AngularFirestore) { }

  ngOnInit(): void {
    // Get the match and team from the params
    const matchId = this.route.snapshot.queryParamMap.get('m');
    const team = this.route.snapshot.queryParamMap.get('tm');
    // Get the scoutId
    // TODO - make this real
    const scoutId = 'abc';

    if (!!matchId && !!team && !!scoutId) {
      this.loadedData = true;
    }

    this.form = this.formBuilder.group({
      matchId: [matchId, [Validators.required]],
      team: [team, [Validators.required]],
      scoutId: [scoutId, [Validators.required]],
      lowGoalsScored: [0, [Validators.required, Validators.min(0)]],
      highGoalsScored: [0, [Validators.required, Validators.min(0)]]
    });

  }

  submit(): void {
    console.log(this.form.value);
    this.store.collection('performances').add(this.form.value);
  }

}
