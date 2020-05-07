import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';

const routes: Routes = [
  { path: 'home', component: ProductComponent, pathMatch: 'full'  },
  { path: 'detail/:OrderId', component: OrderdetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
