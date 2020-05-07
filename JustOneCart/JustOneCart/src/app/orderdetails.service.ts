import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Product } from './product';  
import { CSVRecord } from './csvrecord';

@Injectable({  
  providedIn: 'root'  
})  
  
export class OrderdetailsService {  
  url = 'https://localhost:44334/';    
  constructor(private http: HttpClient) { }  

  createOrder(csvrecord: CSVRecord): Observable<CSVRecord> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<CSVRecord>(this.url+'api/ProductOrders',  
    csvrecord, httpOptions);  
  }  
  getOrderDetails() : Observable<CSVRecord[]>
  {    
    debugger
    console.log(this.http.get<CSVRecord[]>(this.url+'api/ProductOrders'));
    return this.http.get<CSVRecord[]>(this.url+'api/ProductOrders');
  }
  getOrderDetailsbyId(id : Number): Observable<CSVRecord>
  {
    return this.http.get<CSVRecord>(this.url + 'api/ProductOrders/'+id);
  }
  
} 