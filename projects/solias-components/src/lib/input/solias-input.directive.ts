import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[soliasInput]',
  standalone: true,
})
export class SoliasInputDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initClasses();
  }

  private initClasses() {
    this.renderer.addClass(this.el.nativeElement, 'text-base');
    this.renderer.addClass(this.el.nativeElement, 'text-gray-900');
    this.renderer.addClass(this.el.nativeElement, 'dark:text-gray-100');
    this.renderer.addClass(this.el.nativeElement, 'bg-white');
    this.renderer.addClass(this.el.nativeElement, 'dark:bg-gray-800');
    this.renderer.addClass(this.el.nativeElement, 'border');
    this.renderer.addClass(this.el.nativeElement, 'border-gray-300');
    this.renderer.addClass(this.el.nativeElement, 'rounded-md');
    this.renderer.addClass(this.el.nativeElement, 'px-3');
    this.renderer.addClass(this.el.nativeElement, 'py-1');
    this.renderer.addClass(this.el.nativeElement, 'focus:ring-2');
    this.renderer.addClass(this.el.nativeElement, 'focus:ring-blue-500');
    this.renderer.addClass(this.el.nativeElement, 'focus:border-blue-500');
    this.renderer.addClass(this.el.nativeElement, 'outline-none');
  }
}
