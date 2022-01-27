import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Productos } from 'src/app/admin/interface/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  filterControl = new FormControl('all');

  productos:any = []

  constructor(private productSvc:ProductsService,private orderSvc:OrderService) { }

  ngOnInit(){
    this.productSvc.getAllProductsapi().subscribe(res=>{
     this.productos = res;
    })
  }

  addCart(product:Productos){
    this.orderSvc.addCart(product)
  }
}
