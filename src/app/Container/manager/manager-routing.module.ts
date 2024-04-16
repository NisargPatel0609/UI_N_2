import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryCategoryComponent } from './inventory-category/inventory-category.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { OrderComponent } from './order/order.component';
import { DriverComponent } from './driver/driver.component';
import { ResourceAssignmentComponent } from './resource-assignment/resource-assignment.component';

const routes: Routes = [
  {
    path: 'manager',
    component: ManagerComponent,
    children: [
      { path: '',redirectTo:'dashboard',pathMatch:'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'inventory-category', component: InventoryCategoryComponent },
      { path: 'vehicle', component: VehicleComponent },
      { path: 'vehicle-type', component: VehicleTypeComponent },
      { path: 'order', component: OrderComponent},
      { path: 'available-driver', component: DriverComponent},
      { path: 'resource-assignment', component: ResourceAssignmentComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
