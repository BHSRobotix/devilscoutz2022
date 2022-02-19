import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverFeedbackComponent } from './driver-feedback.component';

describe('DriverFeedbackComponent', () => {
  let component: DriverFeedbackComponent;
  let fixture: ComponentFixture<DriverFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
