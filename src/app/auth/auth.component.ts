import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { from, Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthSevice } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alerthost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthSevice,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  // tslint:disable-next-line:typedef
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMsg) => {
        /*console.log(errorMsg);*/
        this.error = errorMsg; /*This is used on different aproach*/
        this.showErrorAlert(errorMsg);
        this.isLoading = false;
      }
    );
    form.reset();
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
  // tslint:disable-next-line:typedef
  OnHandleError() {
    this.error = null;
  }
  /* Here we implement a way to display alerts with programmatic creation (creating a Dynamic Component)*/
  // tslint:disable-next-line:typedef
  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alerthost.viewContainerRef;
    hostViewContainerRef.clear();
    /*To display and close the message  that we got from the back end */
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
