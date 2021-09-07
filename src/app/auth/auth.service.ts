import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { UserModel } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

export interface AuthRespData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  autoLogoutRef: any;
  user = new BehaviorSubject<UserModel>(null);
  constructor(private httpClient: HttpClient, private route: Router) {}

  SignUp(email: string, password: string) {
    return this.httpClient
      .post<AuthRespData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          environment.fireBaseKey,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resp) =>
          this.AuthUser(resp.email, resp.localId, resp.idToken, resp.expiresIn)
        )
      );
  }

  Login(email: string, password: string) {
    return this.httpClient
      .post<AuthRespData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          environment.fireBaseKey,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resp) =>
          this.AuthUser(resp.email, resp.localId, resp.idToken, resp.expiresIn)
        )
      );
  }

  private handleError(errorResp: HttpErrorResponse) {
    let error = "An Unknown error ocurred";
    if (!errorResp.error || !errorResp.error.error) return throwError(error);
    switch (errorResp.error.error.message) {
      case "EMAIL_EXISTS":
        error = "This email already exists";
        break;
      case "EMAIL_NOT_FOUND":
        error = "Email doesn't exist";
        break;
      case "INVALID_PASSWORD":
        error = "Invalid Password";
        break;
    }
    return throwError(error);
  }

  AuthUser(email: string, id: string, token: string, expiresIn: string) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new UserModel(email, id, token, expirationDate);
    localStorage.setItem("userData", JSON.stringify(user));
    this.AutoLogout(+expiresIn * 1000);
    this.user.next(user);
  }

  Logout() {
    this.user.next(null);
    this.route.navigate(["/auth"]);
    localStorage.removeItem("userData");
    clearTimeout(this.autoLogoutRef);
    this.autoLogoutRef = null;
  }

  AutoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) return;
    else {
      const user = new UserModel(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      if (user.token) {
        this.user.next(user);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.AutoLogout(expirationDuration);
      }
    }
  }

  AutoLogout(expirationDuration: number) {
    this.autoLogoutRef = setTimeout(() => {
      this.Logout();
    }, expirationDuration);
  }
}
