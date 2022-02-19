import { Component } from '@angular/core';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'devilscoutz2022';
  faRobot = faRobot;

  constructor(private dialog: MatDialog, private store: AngularFirestore) { }

}
