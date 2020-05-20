import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { OrderdetailsService } from '../orderdetails.service'; 
import { CSVRecord } from '../models/csvrecord';
import { Observable } from 'rxjs';  

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  order : Observable<CSVRecord>; 
  constructor(
    private route: ActivatedRoute,
    private location: Location,private orderservice:OrderdetailsService) {
   }
   
  ngOnInit(): void { 
    this.route.params.forEach((params: CSVRecord) => {
    if (params['ID'] != undefined) {
      let id = +params['ID'];
     this.order = this.orderservice.getOrderDetailsbyId(id);
    } 
  });
  }

  goBack(): void {
    this.location.back();
  }

}
