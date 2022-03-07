import { Component, OnInit } from '@angular/core';
import { TheBlueAllianceService } from '../services/tba/the-blue-alliance.service';

@Component({
  selector: 'dbtz-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(private tba: TheBlueAllianceService) { }

  ngOnInit(): void {
    this.tba.getDistrictEvents().subscribe(result => {
        console.log(result);
      },
      error => {
        console.log(error);
      });
  }
}
