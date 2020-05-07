import { Component, OnInit , ViewChild} from '@angular/core';  
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { CSVRecord } from '../csvrecord';  
import { ProductService } from '../product.service';  
import { Product } from '../product';  

  
@Component({  
  selector: 'app-product',  
  templateUrl: './Product.component.html',  
  styleUrls: ['./Product.component.css']  
})  
export class ProductComponent implements OnInit {  
  dataSaved = false;  
  ProductForm: any;  
  allProducts: Observable<Product[]>;
  allOrders : Observable<CSVRecord[]>;  
  ProductIdUpdate = null;  
  message = null;  
  
  constructor(private formbulider: FormBuilder, private productService:ProductService) { }  
  
  ngOnInit() {  
    this.ProductForm = this.formbulider.group({  
      ID: Number, 
      InternalItemNumber: String,  
      ManufacturerSKU:  String,
      PriceRange:  String, 
      PreferredStore: String,
    });  
    this.loadAllProducts(); 
    this.loadAllOrders(); 
  } 
  loadAllProducts()
  {  
    this.allProducts = this.productService.getAllProducts();
  }  
  loadAllOrders()
  {
    this.allOrders = this.productService.getOrderDetails();
  }
  onFormSubmit() {  
    this.dataSaved = false;  
    const product = this.ProductForm.value;  
    //this.CreateProduct(product);  
    this.ProductForm.reset();  
  }  
  resetForm() {  
    this.ProductForm.reset();  
    this.message = null;  
    this.dataSaved = false;  
  }  

  public records: CSVRecord[];  
  @ViewChild('csvReader') csvReader: any;  
  
  uploadListener($event: any): void { 
    let text = [];  
    let files = $event.srcElement.files;   
    if (this.isValidCSVFile(files[0])) {  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]); 
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
        let headersRow = this.getHeaderArray(csvRecordsArray); 
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
        this.CreateOrder(this.records);
      };  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  } 
  CreateOrder(csvrecord) { 
    for (let i = 0; i < csvrecord.length; i++) { 
        this.productService.createOrder(csvrecord[i]).subscribe(  
          () => {  
            this.dataSaved = true;  
            this.message = 'Record saved Successfully';  
          }  
        );
    }
  }
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
    for (let i = 0; i < csvRecordsArray.length; i++) { 
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord();  
        csvRecord.InternalItemNumber = curruntRecord[0].trim();  
        csvRecord.Quantity = Number(curruntRecord[1]);
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }   
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  } 
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
}  