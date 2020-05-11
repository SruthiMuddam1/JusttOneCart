import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import{LoginComponent} from'./login/login.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: ProductComponent },
  { path: 'detail/:OrderId', component: OrderdetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
