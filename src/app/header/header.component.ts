import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthSevice } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authSevice: AuthSevice
  ) {}
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.userSub = this.authSevice.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }
  // tslint:disable-next-line:typedef
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  // tslint:disable-next-line:typedef
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  // tslint:disable-next-line:typedef
  onLogout() {
    this.authSevice.logout();
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
