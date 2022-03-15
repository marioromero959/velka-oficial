import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Productos } from 'src/app/admin/interface/product';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modalError/modal/modal.component';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  filterControl = new FormControl('all');

  productos:any = []

  constructor(
    private productSvc:ProductsService,
    private orderSvc:OrderService,
    public dialog:MatDialog,
    ) { }

  ngOnInit(){
    this.productSvc.getAllProductsapi().subscribe(res=>{
     this.productos = res;
    })
  }

  addCart(product:Productos){
    const dialogRef = this.dialog.open(DetailComponent,{
      disableClose:false,
      data:product
    }); 
    // this.orderSvc.addCart(product)
  }
}
