import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';
import { InventoryCategoryComponent } from './inventory-category/inventory-category.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { OrderComponent } from './order/order.component';
import { DriverComponent } from './driver/driver.component';
import { ResourceAssignmentComponent } from './resource-assignment/resource-assignment.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { ManageInventoryComponent } from './inventory/manage-inventory/manage-inventory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageInventoryCategoryComponent } from './inventory-category/manage-inventory-category/manage-inventory-category.component';


@NgModule({
  declarations: [
    ManagerComponent,
    InventoryComponent,
    DashboardComponent,
    SideNavComponent,
    InventoryCategoryComponent,
    VehicleComponent,
    VehicleTypeComponent,
    OrderComponent,
    DriverComponent,
    ResourceAssignmentComponent,
    NavbarComponent,
    ManageInventoryComponent,
    ManageInventoryCategoryComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports:[
    ManagerComponent,
    InventoryComponent,
    DashboardComponent,
    SideNavComponent,
    InventoryCategoryComponent,
    VehicleComponent,
    VehicleTypeComponent,
    OrderComponent,
    DriverComponent,
    ResourceAssignmentComponent,
    NavbarComponent
  ]
})
export class ManagerModule { }
