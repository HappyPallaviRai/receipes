import {
  Directive,
  HostListener,
  Renderer2,
  ElementRef,
  HostBinding
} from "@angular/core";

@Directive({
  selector: "[appDropDown]"
})
export class DropDownDirective {
  constructor(private elemRef: ElementRef) {}
  @HostBinding("class.open") toggle: boolean = false;
  @HostListener("document:click", ["$event"]) toggleOpen(event: Event) {
    this.toggle = this.elemRef.nativeElement.contains(event.target)
      ? !this.toggle
      : false;
  }
}
