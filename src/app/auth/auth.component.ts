import {
  Component,
  ComponentFactoryResolver,
  ComponentFactory,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthRespData } from "./auth.service";
import { observable, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorText: string = "";
  closeSub: Subscription;
  @ViewChild(PlaceholderDirective) hostAlert: PlaceholderDirective;
  constructor(
    private authService: AuthService,
    private route: Router,
    private compFactoryResolver: ComponentFactoryResolver
  ) {}
  SwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  OnSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    this.isLoading = true;
    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObs: Observable<AuthRespData>;

    if (this.isLoginMode) {
      authObs = this.authService.Login(email, password);
    } else {
      authObs = this.authService.SignUp(email, password);
    }

    authObs.subscribe(
      (result) => {
        this.isLoading = false;
        console.log(result);
        this.route.navigate(["/recipe"]);
      },
      (error) => {
        this.errorText = error;
        this.ShowAlert(error);
        this.isLoading = false;
      }
    );

    authForm.reset();
  }
  HandleError() {
    this.errorText = null;
  }

  private ShowAlert(message: string) {
    //const alertComponent = new alertComponent(); Cant create angular comp instnace like this
    const compFactory = this.compFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const viewRef = this.hostAlert.ViewContainerRef;
    viewRef.clear(); // Clears everything rendered there before
    const compRef = viewRef.createComponent(compFactory); // Adds the comp. to the DOM
    compRef.instance.message = message;
    this.closeSub = compRef.instance.closeAlert.subscribe(() => {
      this.closeSub.unsubscribe();
      viewRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) this.closeSub.unsubscribe();
  }
}
