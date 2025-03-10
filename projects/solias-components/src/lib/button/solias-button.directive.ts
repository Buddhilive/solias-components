import {
  Directive,
  Input,
  HostBinding,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: 'button[soliasButton]',
  standalone: true,
})
export class SoliasButtonDirective implements OnInit, OnChanges {
  @Input() variant: 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' =
    'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() outlined: boolean = false;
  @Input() disabled: boolean = false;

  @HostBinding('class') buttonClasses: string = '';
  @HostBinding('attr.disabled') get isDisabled() {
    return this.disabled ? true : null;
  }

  ngOnInit(): void {
    this.applyStyles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reapply styles if any input property changes
    if (
      changes['variant'] ||
      changes['size'] ||
      changes['outlined'] ||
      changes['disabled']
    ) {
      this.applyStyles();
    }
  }

  private applyStyles(): void {
    const baseClasses =
      'font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all cursor-pointer';

    const variantClasses = {
      primary:
        'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700',
      secondary:
        'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500 dark:bg-purple-600 dark:hover:bg-purple-700',
      tertiary:
        'bg-yellow-500 text-gray-800 hover:bg-yellow-600 focus:ring-yellow-500 dark:bg-yellow-600 dark:text-gray-900 dark:hover:bg-yellow-700',
      success:
        'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700',
      error:
        'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700',
    };

    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
    };

    const outlinedClasses = {
      primary:
        'border border-blue-500 text-blue-500 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-600 dark:hover:bg-blue-900',
      secondary:
        'border border-purple-500 text-purple-500 hover:bg-purple-50 dark:border-purple-600 dark:text-purple-600 dark:hover:bg-purple-900',
      tertiary:
        'border border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:border-yellow-600 dark:text-yellow-600 dark:hover:bg-yellow-900',
      success:
        'border border-green-500 text-green-500 hover:bg-green-50 dark:border-green-600 dark:text-green-600 dark:hover:bg-green-900',
      error:
        'border border-red-500 text-red-500 hover:bg-red-50 dark:border-red-600 dark:text-red-600 dark:hover:bg-red-900',
    };

    const disabledClasses = {
      primary:
        'bg-blue-300 text-white cursor-not-allowed dark:bg-blue-700 dark:text-blue-200',
      secondary:
        'bg-purple-300 text-white cursor-not-allowed dark:bg-purple-700 dark:text-purple-200',
      tertiary:
        'bg-yellow-300 text-gray-800 cursor-not-allowed dark:bg-yellow-700 dark:text-yellow-200',
      success:
        'bg-green-300 text-white cursor-not-allowed dark:bg-green-700 dark:text-green-200',
      error:
        'bg-red-300 text-white cursor-not-allowed dark:bg-red-700 dark:text-red-200',
    };

    const outlinedDisabledClasses = {
      primary:
        'border border-blue-300 text-blue-300 cursor-not-allowed dark:border-blue-700 dark:text-blue-700',
      secondary:
        'border border-purple-300 text-purple-300 cursor-not-allowed dark:border-purple-700 dark:text-purple-700',
      tertiary:
        'border border-yellow-300 text-yellow-300 cursor-not-allowed dark:border-yellow-700 dark:text-yellow-700',
      success:
        'border border-green-300 text-green-300 cursor-not-allowed dark:border-green-700 dark:text-green-700',
      error:
        'border border-red-300 text-red-300 cursor-not-allowed dark:border-red-700 dark:text-red-700',
    };

    let classes = `${baseClasses} ${sizeClasses[this.size ?? 'medium']}`;

    if (this.disabled) {
      if (this.outlined) {
        classes += ` ${outlinedDisabledClasses[this.variant ?? 'primary']}`;
      } else {
        classes += ` ${disabledClasses[this.variant ?? 'primary']}`;
      }
    } else {
      if (this.outlined) {
        classes += ` ${outlinedClasses[this.variant ?? 'primary']}`;
      } else {
        classes += ` ${variantClasses[this.variant ?? 'primary']}`;
      }
    }

    this.buttonClasses = classes;
  }
}
