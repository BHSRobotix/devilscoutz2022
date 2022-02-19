import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { noop } from 'rxjs';

/** Numeric spinner will have the width of its parent by default, unless modified by setting
 *  the width in CSS. Using CSS classes is preferred but the width can be set inline via
 *  @param [style.width] if necessary.
 */

@Component({
  selector: 'scl-numeric-spinner',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumericSpinnerComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NumericSpinnerComponent),
    multi: true
  }],
  templateUrl: './numeric-spinner.component.html',
  styleUrls: ['./numeric-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NumericSpinnerComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  private onTouched: (value: number | null) => void = noop;

  /** @docs-private */
  onChange: (value: number | null) => void = noop;

  /** @docs-private */
  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement> | undefined;

  /** Set step for numeric spinner. Optional, set to 1 by default. */
  @Input() step = 1;

  /** Set min possible value for numeric spinner. Optional, set to 0 by default. */
  @Input() @HostBinding('attr.aria-valuemin') min = 0;

  /** Set max possible value for numeric spinner. Optional. */
  @Input() @HostBinding('attr.aria-valuemax') max?: number;

  /** Optional input placeholder. */
  @Input() @HostBinding('attr.aria-placeholder') placeholder = '';

  /** Whether or not the numeric spinner is readonly. False by default. */
  @Input() @HostBinding('attr.aria-readonly') readonly = false;

  /** Whether or not the numeric spinner is required. False by default. */
  @Input() @HostBinding('attr.aria-required') required = false;

  /** Whether or not the numeric spinner is disabled. False by default. */
  @Input() @HostBinding('attr.aria-disabled') disabled = false;

  @HostBinding('attr.role') ariaRole = 'spinbutton';

  constructor(private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetectorRef.markForCheck();
  }

  writeValue(value: number | null = null): void {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  /** @docs-private */
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.min != null && control.value < this.min) {
      return {min: true};
    }
    if (this.max != null && control.value > this.max) {
      return {max: true};
    }
    return null;
  }

  /** Numeric spinner initial value.  */
  @Input()
  @HostBinding('attr.aria-valuenow')
  get value(): number | null {
    if (!this.input?.nativeElement.value) {
      return null;
    }
    return this.input.nativeElement.valueAsNumber;
  }
  set value(value: number | null) {
    if (!this.input) {
      return;
    }
    this.input.nativeElement.value = this.asString(value);
  }

  /** @docs-private */
  increment(): void {
    if (this.disabled) {
      return;
    }
    const oldValue = this.value;
    const step = this.step || 1;

    if (this.value == null) {
      this.value = this.clamp(0);
    } else if (this.min != null && this.min > this.value) {
      this.value = this.min;
    } else if (this.max == null || this.value + step <= this.max) {
      this.value = this.value + step;
    }

    if (this.value !== oldValue) {
      this.onChange(this.value);
    }
  }

  /** @docs-private */
  decrement(): void {
    if (this.disabled) {
      return;
    }
    const oldValue = this.value;
    const step = this.step || 1;

    if (this.value == null) {
      this.value = this.clamp(0);
    } else if (this.max != null && this.max < +this.value) {
      this.value = this.max;
    } else if (this.min == null || this.value - step >= this.min) {
      this.value = this.value - step;
    }

    if (this.value !== oldValue) {
      this.onChange(this.value);
    }
  }

  private asString(value: number | null): string {
    if (value == null || Number.isNaN(value)) {
      return '';
    }

    if (Number.isFinite(value)) {
      return String(value);
    }

    if (value === Infinity) {
      return String(this.clamp(Number.MAX_SAFE_INTEGER));
    }

    if (value === -Infinity) {
      return String(this.clamp(Number.MIN_SAFE_INTEGER));
    }
    return String(value);
  }

  private clamp(value: number): number {
    if (this.min != null) {
      value = Math.max(this.min, value);
    }

    if (this.max != null) {
      value = Math.min(this.max, value);
    }

    return value;
  }

  private toggle(token: string, force?: boolean): boolean {
    return this.elementRef.nativeElement.classList.toggle(token, force);
  }
}
