import { TestComponent } from './test/test.component';
import { AuthGuard } from './auth/auth.guard';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UsersComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'passData', component: TestComponent, data: { id: 1, name: "xyz" } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
