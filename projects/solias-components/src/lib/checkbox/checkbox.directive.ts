import {
  Directive,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[soliasCheckbox]',
  standalone: true,
})
export class SoliasCheckboxDirective implements OnInit, OnChanges {
  @Input() readOnly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() validity: 'valid' | 'invalid' | null = null;

  @HostBinding('class') elementClasses: string = '';
  @HostBinding('attr.disabled') get isDisabled() {
    return this.disabled ? true : null;
  }

  @HostBinding('attr.readonly') get isReadOnly() {
    return this.readOnly ? true : null;
  }

  ngOnInit(): void {
    this.initClasses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['readOnly'] || changes['disabled'] || changes['validity']) {
      this.initClasses();
    }
  }

  private initClasses() {
    let baseClasses = 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600';

    if (this.disabled) {
      baseClasses = 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600';
    }

    this.elementClasses = baseClasses;
  }
}
