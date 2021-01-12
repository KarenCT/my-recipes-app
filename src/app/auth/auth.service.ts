import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthSevice {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}
  // tslint:disable-next-line:typedef
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIKey,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  // tslint:disable-next-line:typedef
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  // tslint:disable-next-line:typedef
  logout() {
    this.user.next(null);
    this.router.navigate(['auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  // tslint:disable-next-line:typedef
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  /*To keep the user sesion alive*/
  // tslint:disable-next-line:typedef
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    /*Validate if there is a user*/
    if (!userData) {
      return;
    }
    const loaderUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loaderUser.token) {
      this.user.next(loaderUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  // tslint:disable-next-line:typedef
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  // tslint:disable-next-line:typedef
  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email exists already!';
        break;
      // tslint:disable-next-line:no-switch-case-fall-through
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'This email does not exist!';
        break;
      // tslint:disable-next-line:no-switch-case-fall-through
      case 'INVALID_PASSWORD':
        errorMsg = 'Your data is not correct!';
        break;
      // tslint:disable-next-line:no-switch-case-fall-through
      case 'USER_DISABLED':
        errorMsg = 'User has been desabled!';
        break;
    }
    return throwError(errorMsg);
  }
}
