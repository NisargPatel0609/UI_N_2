import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Inventory } from '../../../Models/Inventory.model';
import { InventoryService } from '../../../Services/Manager/inventory.service';
import { ManageInventoryComponent } from './manage-inventory/manage-inventory.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','category', 'stock', 'price','action'];
  inventories: Inventory[] = [];
  dataSource: MatTableDataSource<Inventory>;
  selectedInventory: Inventory = null;
  isEditMode: boolean = false;

  constructor(
    private inventoryService: InventoryService,
    private liveAnnouncer: LiveAnnouncer,
    private toastr: ToastrService
  ) {}
  @ViewChild('inventoryModel') inventoryModel:ManageInventoryComponent;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getInventories();
  }
  label:string = 'Add Inventory';
  getInventories(): void {
    this.inventoryService.getInventories().subscribe({
      next: (response) => {
        this.inventories = response.data as Inventory[];
        this.dataSource = new MatTableDataSource(this.inventories);
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  onAddInventoryClick(){
    this.isEditMode = false;
    this.selectedInventory = null;
  }
  onItemAdded(){
    this.getInventories();
  }
  

  onEdit(id:number){
    console.log("on edit");
    
    this.isEditMode = true;
    this.selectedInventory = this.inventories.find(invent => invent.id === id)
    this.inventoryModel.setValue(this.selectedInventory);
  }

  onDelete(id:number){
    this.deleteInventories(id);
  }

  deleteInventories(id:number){
    this.inventoryService.deleteInventory(id).subscribe({
      next: (response) => {
        this.toastr.success("Success","Inventory deleted successfully");
        this.getInventories();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error("Error","Error while deleting inventory");

      }
    });
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}
