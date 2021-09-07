import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { map, tap, take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map((data) => {
        const isAuth = !!data;
        if (isAuth) return true;
        return this.router.createUrlTree(["/auth"]);
      })
      //   tap((isAuth) => {
      //     if (isAuth) return true;
      //     return this.router.navigate(["/auth"]);
      //   })
    );
  }
}
