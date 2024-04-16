import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Container/admin/admin.component';
import { DriverComponent } from './Container/driver/driver.component';
import { CustomerComponent } from './Container/customer/customer.component';
import { AuthComponent } from './Container/auth/auth.component';

const routes: Routes = [
  {path:'admin', component:AdminComponent},
  {path:'driver', component:DriverComponent},
  {path:'customer', component:CustomerComponent},
  {path:'auth', component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }