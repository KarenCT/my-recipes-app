import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

/*Here we are creating the app navigation*/
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  } /*This is default path*/,
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
