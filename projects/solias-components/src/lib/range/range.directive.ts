import { Directive, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[soliasRange]',
  standalone: true,
})
export class SoliasRangeDirective implements OnInit, OnChanges {
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
      'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700';

    if (this.disabled) {
      baseClasses =
        'w-full h-2 bg-gray-200 rounded-lg appearance-none dark:bg-gray-700 cursor-not-allowed';
    }

    this.elementClasses = baseClasses;
  }
}
