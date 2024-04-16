import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './Container/admin/admin.component';
import { DriverComponent } from './Container/driver/driver.component';
import { CustomerComponent } from './Container/customer/customer.component';
import { AuthComponent } from './Container/auth/auth.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManagerModule } from './Container/manager/manager.module';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DriverComponent,
    CustomerComponent,
    AuthComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    CommonModule,
    ManagerModule,
    MatTableModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



