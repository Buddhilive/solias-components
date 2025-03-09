import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[soliasInput]',
  standalone: true,
})
export class SoliasInputDirective implements OnInit, OnDestroy {
  private observer!: MutationObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initClasses();
    this.setupMutationObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initClasses() {
    const nativeElement = this.el.nativeElement;

    // Base classes
    this.renderer.addClass(nativeElement, 'text-base');
    this.renderer.addClass(nativeElement, 'text-gray-900');
    this.renderer.addClass(nativeElement, 'dark:text-gray-100');
    this.renderer.addClass(nativeElement, 'bg-white');
    this.renderer.addClass(nativeElement, 'dark:bg-gray-800');
    this.renderer.addClass(nativeElement, 'border');
    this.renderer.addClass(nativeElement, 'border-gray-300');
    this.renderer.addClass(nativeElement, 'rounded-md');
    this.renderer.addClass(nativeElement, 'px-3');
    this.renderer.addClass(nativeElement, 'py-1');
    this.renderer.addClass(nativeElement, 'focus:ring-2');
    this.renderer.addClass(nativeElement, 'focus:ring-blue-500');
    this.renderer.addClass(nativeElement, 'focus:border-blue-500');
    this.renderer.addClass(nativeElement, 'outline-none');

    // Dynamic classes based on state
    this.updateDisabledClasses();
    this.updateReadOnlyClasses();
  }

  private updateDisabledClasses() {
    const nativeElement = this.el.nativeElement;
    if (nativeElement.disabled) {
      this.renderer.addClass(nativeElement, 'bg-gray-100');
      this.renderer.addClass(nativeElement, 'dark:bg-gray-700');
      this.renderer.addClass(nativeElement, 'cursor-not-allowed');
    } else {
      this.renderer.removeClass(nativeElement, 'bg-gray-100');
      this.renderer.removeClass(nativeElement, 'dark:bg-gray-700');
      this.renderer.removeClass(nativeElement, 'cursor-not-allowed');
    }
  }

  private updateReadOnlyClasses() {
    const nativeElement = this.el.nativeElement;
    if (nativeElement.readOnly) {
      this.renderer.addClass(nativeElement, 'bg-gray-50');
      this.renderer.addClass(nativeElement, 'dark:bg-gray-900');
      this.renderer.addClass(nativeElement, 'cursor-default');
    } else {
      this.renderer.removeClass(nativeElement, 'bg-gray-50');
      this.renderer.removeClass(nativeElement, 'dark:bg-gray-900');
      this.renderer.removeClass(nativeElement, 'cursor-default');
    }
  }

  private setupMutationObserver() {
    const nativeElement = this.el.nativeElement;

    // Create a MutationObserver to watch for attribute changes
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          switch (mutation.attributeName) {
            case 'disabled':
              this.updateDisabledClasses();
              break;
            case 'readonly':
              this.updateReadOnlyClasses();
              break;
          }
        }
      });
    });

    // Start observing the input element for attribute changes
    this.observer.observe(nativeElement, {
      attributes: true, // Watch for attribute changes
      attributeFilter: ['disabled', 'readonly'], // Only watch for these specific attributes
    });
  }
}
