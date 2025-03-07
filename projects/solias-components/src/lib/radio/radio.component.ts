import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'solias-radio',
  imports: [CommonModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SoliasRadioComponent),
      multi: true,
    },
  ],
})
export class SoliasRadioComponent implements ControlValueAccessor {
  @Input() value: any;
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;

  @Output() change = new EventEmitter<Event>();

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.checked = value === this.value;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onRadioChange(event: Event): void {
    this.checked = true;
    this._onChange(this.value);
    this._onTouched();
    this.change.emit(event);
  }
}
