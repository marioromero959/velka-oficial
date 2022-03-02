import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OrderService } from 'src/app/services//order/order.service';
import { ProductsService } from '../../services/products.service';
import Swiper, { Navigation, Pagination,Autoplay } from 'swiper';
import { Productos } from 'src/app/admin/interface/product';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit, AfterViewInit{

  // @Input('productos') products = [];
  products:Productos[] = [];

  constructor(private productSvc:ProductsService, private orderSvc:OrderService) { }

  ngOnInit(): void {
    this.productSvc.getAllProductsapi().subscribe(res=>{
      this.products = res;
    })
  }

  ngAfterViewInit(){
    Swiper.use([Navigation, Pagination,Autoplay]);
    const swiper = new Swiper('.swiper', {
      loop: true,
      autoplay:{
        disableOnInteraction:false,
        delay:2000,
      },
    });
  }

  addCart(product:Productos){
    this.orderSvc.addCart(product)
  }
}
