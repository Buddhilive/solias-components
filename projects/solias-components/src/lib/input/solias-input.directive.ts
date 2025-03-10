import {
  Directive,
  OnInit,
  Input,
  HostBinding,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[soliasInput]',
  standalone: true,
})
export class SoliasInputDirective implements OnInit, OnChanges {
  @Input() readOnly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() validity: 'valid' | 'invalid' | null = null;

  @HostBinding('class') inputClasses: string = '';
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
    // Base classes
    let baseClasses =
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

    if (this.disabled) {
      baseClasses =
        'mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500';
    } else if (this.readOnly) {
      baseClasses =
        'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500';
    } else if (this.validity === 'valid') {
      baseClasses =
        'bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500';
    } else if (this.validity === 'invalid') {
      baseClasses =
        'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500';
    }

    this.inputClasses = baseClasses;
  }
}
