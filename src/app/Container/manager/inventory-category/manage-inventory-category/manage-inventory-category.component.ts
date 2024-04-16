import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryCategoryService } from '../../../../Services/Manager/inventory-category.service';
import { InventoryCategory } from '../../../../Models/InventoryCategory.model';
import { InventoryService } from '../../../../Services/Manager/inventory.service';
import { Inventory } from '../../../../Models/Inventory.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-manage-inventory-category',
  templateUrl: './manage-inventory-category.component.html',
  styleUrl: './manage-inventory-category.component.scss'
})
export class ManageInventoryCategoryComponent {
  InventoryForm:FormGroup;

  inventoryCategories:InventoryCategory[] = [];
  // file:File = null;
  inventoryCategory:InventoryCategory = {} as InventoryCategory;
  formSubitted:boolean = false;
  @ViewChild('closebutton') closebutton;

  @Output() itemAdded:EventEmitter<any> = new EventEmitter<any>();

  @Input() selectedInventoryCategory:InventoryCategory;
  @Input() isEditMode:boolean;

  constructor(private formBuilder:FormBuilder,private toastr: ToastrService){}

  setValue(value : Inventory){
    if(value){
      this.InventoryForm.get('name').setValue(value.name);
      this.InventoryForm.get('createdAt').setValue(value.createdAt);
      // this.InventoryForm.get('description').setValue(value.description);
      // this.InventoryForm.get('quantity').setValue(value.stock);
      // this.InventoryForm.get('price').setValue(value.price);
    }
  }
  inventoryCategoryService:InventoryCategoryService = inject(InventoryCategoryService);
  // inventoryService:InventoryService = inject(InventoryService);

  ngOnInit(): void {
    this.getInventoryCategories();
    this.InventoryForm= new FormGroup({
      name: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s]{1,100}$/)])
      // category: new FormControl('default',[Validators.required]),
      // description: new FormControl(null,[Validators.required, Validators.pattern(/^.{5,500}$/)]),
      // quantity: new FormControl(null,[Validators.required, Validators.pattern(/^(?:[1-9]|\d{2,3}|[1-4]\d{3}|5000)$/)]),
      // price: new FormControl('',[Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      // image: new FormControl('',[Validators.required])
    },)

  }
  onEditModeChange(){
    this.isEditMode = true;
  }

  onChange(){
    this.formSubitted = false;

  }


  onFormSubmit(){
    this.formSubitted = true;
    if(this.InventoryForm.valid){
      this.closebutton.nativeElement.click();
      
      if(this.isEditMode){
        this.onUpdateInventoryClick();
      }
      else{
        this.inventoryCategory.name = this.InventoryForm.value.name;
        // this.inventoryCategory = this.InventoryForm.value.category;
        // this.inventoryCategory.description = this.InventoryForm.value.description;
        // this.uploadImage(); 
        // this.inventory.stock = this.InventoryForm.value.quantity;
        // this.inventory.price = this.InventoryForm.value.price;
        // this.inventoryCategory.warehouseId = 1;
      }
    }
  }
  
  // uploadImage(){
  //   this.inventoryCategoryService.fileUpload(this.file).then((res)=>{
  //     this.inventory.image = res;  
  //     this.postInventory(this.inventory)   
  //   })
  //   .catch((err)=>{
  //   })
  // }

  // onFileSelected(event:any){
  //    this.file= event.target.files[0];
  // }


  getInventoryCategories(){
    this.inventoryCategoryService.getInventoryCategories().subscribe({
      next:(response)=>{
        this.inventoryCategories = response.data as InventoryCategory[];
      }
    })
  }
  onUpdateInventoryClick(){

    this.inventoryCategory.id = this.selectedInventoryCategory.id;
    this.inventoryCategory.name = this.InventoryForm.value.name;
    // this.inventory.categoryId = this.InventoryForm.value.category;
    // this.inventory.description = this.InventoryForm.value.description;
    // // this.inventory.image = this.selectedInventoryCategory.image;
    // this.inventory.stock = this.InventoryForm.value.quantity;
    // this.inventory.price = this.InventoryForm.value.price;
    // this.inventory.IsActive = true;
    // this.inventory.updatedAt = new Date();
    // this.inventoryCategory?.warehouseId = 1;
    this.inventoryCategory.createdAt = this.selectedInventoryCategory.createdAt;

 
    this.updateInventory(this.inventoryCategory);
  }
  updateInventory(inventoryCategory:InventoryCategory){
    console.log(inventoryCategory);
    
    this.inventoryCategoryService.updateInventoryCategory(this.inventoryCategory).subscribe({
      next:(response)=>{
        this.toastr.success("Success","Inventory Updated Successfully");
        this.itemAdded.emit(response);
        this.InventoryForm.reset();
        this.formSubitted=false;
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error("Error","Failed to Update Inventory");

      }
    })
  }
  
  postInventory(inventoryCategory:InventoryCategory){
    this.inventoryCategoryService.postInventoryCategory(inventoryCategory).subscribe({
      next:(response)=>{
        this.toastr.success("Success","Inventory added Successfully");
        this.itemAdded.emit(response);
        this.InventoryForm.reset();
        this.formSubitted=false;

      },
      error:(err)=>{
        console.log(err);
        this.toastr.error("Error","Failed to add Inventory");

      }
    })
  }
}

