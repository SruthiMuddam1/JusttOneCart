import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Product } from '../models/product';  
import { CSVRecord } from '../models/csvrecord';  

@Injectable({  
  providedIn: 'root'  
})  
  
export class ProductService {  
  url = 'https://localhost:44334/';    
  constructor(private http: HttpClient) { }  
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + 'Api/Product/AllProducts');  
  }  
  addProduct(item : Product):Observable<Product>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    return this.http.post<Product>(this.url+'Api/Product/InsertProductDetails/',item,httpOptions);
  }
  getProductById(ID: Number): Observable<Product> {  
    return this.http.get<Product>(this.url + 'Api/Product/GetProductDetailsById/' + ID);  
  }  
  editProductById(item : Product):Observable<Product>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    return this.http.put<Product>(this.url+'Api/Product/UpdateProductDetails/',item,httpOptions);
  }
  createOrder(csvrecord: CSVRecord): Observable<CSVRecord> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<CSVRecord>(this.url+'api/ProductOrders',  
    csvrecord, httpOptions);  
  }  
  getOrderDetails() : Observable<CSVRecord[]>
  {    
    return this.http.get<CSVRecord[]>(this.url+'api/ProductOrders');
  }
  getOrderDetailsbyId(id : Number): Observable<CSVRecord>
  {
    return this.http.get<CSVRecord>(this.url + ' api/ProductOrders/'+id);
  }
  
} 