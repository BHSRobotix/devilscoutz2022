import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMatchMenuComponent } from './single-match-menu.component';

describe('SingleMatchMenuComponent', () => {
  let component: SingleMatchMenuComponent;
  let fixture: ComponentFixture<SingleMatchMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMatchMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMatchMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
