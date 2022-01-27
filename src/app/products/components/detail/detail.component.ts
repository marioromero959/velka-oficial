import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OrderService } from 'src/app/services/order/order.service';
import { ProductsService } from '../../services/products.service';
import { Productos } from 'src/app/admin/interface/product';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  product:Productos;

  constructor(private route:ActivatedRoute,
              private productSvc:ProductsService,
              private orderSvc:OrderService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      const id = params.id;
       this.productSvc.getProductapi(id).subscribe((res:Productos)=>{
         this.product = res
        console.log(res)
      }) 
    });
  }
  addCart(product:Productos){
    this.orderSvc.addCart(product)
  }
}
