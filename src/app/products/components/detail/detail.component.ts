import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OrderService } from 'src/app/services/order/order.service';
import { ProductsService } from '../../services/products.service';
import { Productos } from 'src/app/admin/interface/product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  // product:Productos;
  talles = ['S', 'M','L','XL']//TODO VER SELECT
  selected = 'S'

  constructor(
        @Inject(MAT_DIALOG_DATA) 
        public product: any,
        private route:ActivatedRoute,
        private productSvc:ProductsService,
        private orderSvc:OrderService,
        public dialogRef: MatDialogRef<DetailComponent>,
  ) { }

  ngOnInit(): void {
 /*       this.productSvc.getProductapi(this.producto._id).subscribe((res:Productos)=>{
         this.product = res
        console.log(res)
      })  */ //Llama un producto a la api
      this.product.talle = this.selected
  }

  changeTalle(e,product){
    product.talle = e.value
  }

  addCart(product:Productos){
      this.orderSvc.addCart(product)
  }
}
