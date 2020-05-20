import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location }                 from '@angular/common';
import { OrderdetailsService } from '../orderdetails.service'; 
import { Product } from '../models/product';
import { Observable } from 'rxjs';  
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product : Observable<Product>; 
  item : Product;
  update :string;
  itemForm: FormGroup;
    constructor(private route: ActivatedRoute,
    private location: Location,private productservice:ProductService,private itemFB: FormBuilder) { }

    ngOnInit(): void { 
      this.item = new Product();
      this.createForm();
      this.route.params.forEach((params: Product) => {
      if (params['ID'] != undefined) {
        let id = +params['ID'];
       this.product = this.productservice.getProductById(id);
      } 
    });
    }
    createForm() {
      this.itemForm = this.itemFB.group({
        InternalItemNumber: [this.item.InternalItemNumber],
        ManufacturerSKU: [this.item.ManufacturerSKU],
        PreferredStore: [this.item.PreferredStore],
        Description: [this.item.Description]
      });
    }
    edit(item:Product)
    {
      if( this.itemForm.controls.InternalItemNumber.value)
      {
        item.InternalItemNumber = this.itemForm.controls.InternalItemNumber.value;
      }
      if( this.itemForm.controls.ManufacturerSKU.value)
      {
        item.ManufacturerSKU = this.itemForm.controls.ManufacturerSKU.value;
      }
      if( this.itemForm.controls.Description.value)
      {
        item.Description = this.itemForm.controls.Description.value;
      }
      if( this.itemForm.controls.PreferredStore.value)
      {
        item.PreferredStore = this.itemForm.controls.PreferredStore.value;
      }
      debugger;
      item.PriceRange = '0'
      this.productservice.editProductById(item).subscribe();
      this.update = 'Updated Successfully!'
    }
    
    getComponentTitle(item:Product) {
      let result = ''
  
      result = `Review Product - ${item.InternalItemNumber} ${item.ManufacturerSKU}`;
      return result;
    }
    goBack(): void {
      this.location.back();
    }

}
