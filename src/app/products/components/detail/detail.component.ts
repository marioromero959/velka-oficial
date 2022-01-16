import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { product } from '../../../shared/interface';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  product:product;

  constructor(private route:ActivatedRoute,
              private productSvc:ProductsService,
              private orderSvc:OrderService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      const id = parseInt(params.id);
      this.product = this.productSvc.getProduct(id);

      //TODO: Obtener id de mongo
      const nuevoid = '61bce94c339ab68aa6b34c03';
      this.productSvc.getProductapi(nuevoid).subscribe(res=>{
        // console.log(res)
      })
    });
  }
  addCart(product:product){
    this.orderSvc.addCart(product)
  }
}
