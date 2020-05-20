import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from '@angular/material/table';
import{MatInputModule} from '@angular/material/input'
import{MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAddComponent } from './product-add/product-add.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    OrderdetailsComponent,
    LoginComponent,
    ProductDetailsComponent,
    ProductAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,
    MatDialogModule,
    MatTableModule,
    MatTabsModule,ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
