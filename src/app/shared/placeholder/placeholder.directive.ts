import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appPlaceHolder]", //attribute selector
})
export class PlaceholderDirective {
  constructor(public ViewContainerRef: ViewContainerRef) {}
}
