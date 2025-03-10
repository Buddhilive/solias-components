import { Directive, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[soliasRadio]',
  standalone: true,
})
export class SoliasRadioDirective implements OnInit, OnChanges {
  @Input() disabled: boolean = false;

  @HostBinding('class') elementClasses: string = '';
  @HostBinding('attr.disabled') get isDisabled() {
    return this.disabled ? true : null;
  }

  ngOnInit(): void {
    this.initClasses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['readOnly'] || changes['disabled']) {
      this.initClasses();
    }
  }

  private initClasses() {
    let baseClasses =
      'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:outline-none dark:bg-gray-700 dark:border-gray-600';

    if (this.disabled) {
      baseClasses =
        'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:outline-none dark:bg-gray-700 dark:border-gray-600';
    }

    this.elementClasses = baseClasses;
  }
}
