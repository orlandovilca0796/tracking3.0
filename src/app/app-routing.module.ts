import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EmptyComponent } from './pages/empty/empty.component';
import { redirectUnauthorizedTo, AuthGuard, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['pages/login']);

const routes: Routes = [
  {
    path: 'pages/signup',
    component: SignupComponent,
  },
  {
    path: 'pages/login',
    component: LoginComponent,
  },
  {
    path: 'pages/empty',
    component: EmptyComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  /*{ path: '',   redirectTo: '/pages/login', pathMatch: 'full' },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
