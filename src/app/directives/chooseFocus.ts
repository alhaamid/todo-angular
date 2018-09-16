import { Directive, OnInit, Input, ElementRef, Renderer } from "@angular/core";

@Directive({ selector: '[chooseFocus]' })
export class FocusDirective implements OnInit {
 
  @Input('chooseFocus') isFocused: boolean;
 
  constructor(private hostElement: ElementRef, private renderer: Renderer) {}
 
  ngOnInit() {
    if (this.isFocused) {
      this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
    }
  }
}