import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Location }                 from '@angular/common';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms'; 
import { Product } from '../models/product';
import { Observable } from 'rxjs'; 
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  product : Observable<Product>; 
  item : Product;
  update :string;
  itemForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private location: Location,private productservice:ProductService,private itemFB: FormBuilder) { }

  ngOnInit(): void {    
    this.item = new Product();
    this.createForm();
  }

  createForm() {
    this.itemForm = this.itemFB.group({
      InternalItemNumber: [this.item.InternalItemNumber,Validators.required],
      ManufacturerSKU: [this.item.ManufacturerSKU,Validators.required],
      PreferredStore: [this.item.PreferredStore,Validators.required],
      Description: [this.item.Description,Validators.required]
    });
  }
  add()
  {
    if( this.itemForm.controls.InternalItemNumber.value)
      {
        this.item.InternalItemNumber = this.itemForm.controls.InternalItemNumber.value;
      }
      if( this.itemForm.controls.ManufacturerSKU.value)
      {
        this.item.ManufacturerSKU = this.itemForm.controls.ManufacturerSKU.value;
      }
      if( this.itemForm.controls.Description.value)
      {
        this.item.Description = this.itemForm.controls.Description.value;
      }
      if( this.itemForm.controls.PreferredStore.value)
      {
        this.item.PreferredStore = this.itemForm.controls.PreferredStore.value;
      }
      this.item.PriceRange = '0';
      this.productservice.addProduct(this.item).subscribe();
      this.update = 'Updated Successfully!'
  }

}
