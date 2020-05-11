import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from '../models/user';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';


  
@Injectable({ providedIn: 'root' })
export class UserService {
  baseURL: string;
    
    constructor(private http: HttpClient) {
      this.baseURL="https://localhost:44334/";
     }
    private extractData(res: Response) {
        let body = res;
        return body || { };
      }



      getUsers (): Observable<any> {
        
        return this.http.get<any>( this.baseURL+'Home/Get');

      }
      
  getGuidesInfo(Id:number):Observable<any>
  {
    console.log(Id);
    return this.http.get<any>(this.baseURL+'Home/GetGuidesInfo/?Id='+Id);
  }



  getTours() {
    //console.log(this.http.get<any>(this.baseURL + 'Home/GetTours'));
    return this.http.get<any>(this.baseURL + 'Home/GetTours');
    
  }



      authnUser (username:string,password:string): Observable<boolean> {
      
        
       return this.http.post<any>( this.baseURL + 'Home/AuthenticateUser',  {
        username: username,
        password: password
      });
      } 

    handleError(arg0: string, arg1: undefined[]): (err: any, caught: Observable<any>) => import("rxjs").ObservableInput<any> {
        throw new Error("Method not implemented.");
    }
}
