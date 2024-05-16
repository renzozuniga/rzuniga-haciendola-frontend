import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

// Guards
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'recoverPassword', component: RecoverPasswordComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
