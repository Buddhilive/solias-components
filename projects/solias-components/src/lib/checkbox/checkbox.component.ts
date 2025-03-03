import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'solias-checkbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SoliasCheckboxComponent),
      multi: true,
    },
  ],
})
export class SoliasCheckboxComponent implements ControlValueAccessor {
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() indeterminate: boolean = false;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() required: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() ariaLabelledby: string = '';
  @Input() ariaDescribedby: string = '';

  @Output() checkedChange = new EventEmitter<boolean>();

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: boolean): void {
    this.checked = value;
    this.checkedChange.emit(this.checked);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onCheckboxChange(event: boolean): void {
    this.checked = event;
    this.onChange(this.checked);
    this.checkedChange.emit(this.checked);
  }
}
