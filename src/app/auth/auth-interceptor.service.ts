import { Injectable } from '@angular/core';
import { AuthSevice } from './auth.service';
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { take } from 'rxjs/internal/operators/take';
import { exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthSevice) {}
  // tslint:disable-next-line:typedef
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        /*If we do not have user return just req*/
        if (!user) {
          return next.handle(req);
        }
        /*Here get the current user token*/
        const modfideReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modfideReq);
      })
    );
  }
}
