import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchScoutingMenuComponent } from './match-scouting-menu.component';

describe('MatchScoutingMenuComponent', () => {
  let component: MatchScoutingMenuComponent;
  let fixture: ComponentFixture<MatchScoutingMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchScoutingMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchScoutingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
