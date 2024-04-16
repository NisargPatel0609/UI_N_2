import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Inventory } from '../../../Models/Inventory.model';
import { InventoryService } from '../../../Services/Manager/inventory.service';
import { ToastrService } from 'ngx-toastr';
import { InventoryCategoryService } from '../../../Services/Manager/inventory-category.service';
import { InventoryCategory } from '../../../Models/InventoryCategory.model';

@Component({
  selector: 'app-inventory-category',
  templateUrl: './inventory-category.component.html',
  styleUrl: './inventory-category.component.scss'
})
export class InventoryCategoryComponent {
  displayedColumns: string[] = ['id', 'name','createdAt','action'];
  inventoryCategories: InventoryCategory[] = [];
  dataSource: MatTableDataSource<InventoryCategory>;
  selectedInventoryCategory: InventoryCategory = null;
  isEditMode: boolean = false;

  constructor(
    // private inventoryService: InventoryService,
    private inventoryCategoryService: InventoryCategoryService,
    private liveAnnouncer: LiveAnnouncer,
    private toastr: ToastrService
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getInventoryCategory();
  }

  label:string = 'Add Inventory';
  getInventoryCategory(): void {
    this.inventoryCategoryService.getInventoryCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.inventoryCategories = response.data as InventoryCategory[];
        this.dataSource = new MatTableDataSource(this.inventoryCategories);
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onAddInventoryCategoryClick(){
    this.isEditMode = false;
    this.selectedInventoryCategory = null;
  }
  onItemAdded(){
    this.getInventoryCategory();
  }
  

  onEdit(id:number){
    this.isEditMode = true;
    this.selectedInventoryCategory = this.inventoryCategories.find(invent => invent.id === id)
  }

  onDelete(id:number){
    this.deleteInventoryCategory(id);
  }

  deleteInventoryCategory(id:number){
    this.inventoryCategoryService.deleteInventoryCategory(id).subscribe({
      next: (response) => {
        this.toastr.success("Success","Inventory deleted successfully");
        this.getInventoryCategory();
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



