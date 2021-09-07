import { NgModule } from "@angular/core";
import { DropDownDirective } from "./dropdown.directive";
import { AuthComponent } from "../auth/auth.component";
import { SpinnerComponent } from "./loading-Spinners/spinner.component";
import { AlertComponent } from "./alert/alert/alert.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    DropDownDirective,
    SpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    DropDownDirective,
    SpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    CommonModule,
  ],
})
export class SharedModule {}
