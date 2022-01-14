import { Component, OnInit } from '@angular/core';
import { product } from '../../../shared/interface';
import { FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  filterControl = new FormControl('all');

  products:product[] = []
  productos:any = []

  constructor(private productSvc:ProductsService,private orderSvc:OrderService) { }

  ngOnInit(){
    this.products = this.productSvc.getAllProducts() 
    //TODO: Aplicar carga de productos
    this.productSvc.getAllProductsapi().subscribe((res:any)=>{
     this.productos = res.productos;
     console.log(this.productos);
    }) 
  }

  addCart(product:product){
    this.orderSvc.addCart(product)
  }
}
