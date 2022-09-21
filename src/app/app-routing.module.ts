import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './customer/login/login.component'
import {SignupComponent} from './customer/signup/signup.component'
import {DashboardComponent} from './customer/dashboard/dashboard.component'
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component'
import { CartComponent } from './customer/cart/cart.component';
import { AuthGuard } from './Auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'customer/login', pathMatch: 'full' },
  {
    path: 'customer',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
      { path: 'cart', component: CartComponent,canActivate:[AuthGuard] },
    ],
  },
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
