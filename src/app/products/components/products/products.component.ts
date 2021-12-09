import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/interface';
import { FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  filterControl = new FormControl('all');

  products:product[] = []

  constructor(private productSvc:ProductsService,private orderSvc:OrderService) { }

  ngOnInit(){
    this.products = this.productSvc.getAllProducts() 
  }
  addCart(product:product){
    this.orderSvc.addCart(product)
  }
}
