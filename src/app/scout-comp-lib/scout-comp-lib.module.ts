import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { NumericSpinnerComponent } from './numeric-spinner/numeric-spinner.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormLabelComponent } from './form-field/form-label/form-label.component';
import { FormErrorComponent } from './form-field/form-error/form-error.component';
import { FormControlComponent } from './form-field/form-control/form-control.component';

@NgModule({
  declarations: [
    FormErrorComponent,
    FormFieldComponent,
    FormLabelComponent,
    NumericSpinnerComponent,
    TimerComponent,
    FormControlComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumericSpinnerComponent,
    FormErrorComponent,
    FormFieldComponent,
    FormLabelComponent,
    TimerComponent,
    FormControlComponent
  ]
})
export class ScoutCompLibModule { }
