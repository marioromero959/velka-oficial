import { Component, OnInit, AfterViewInit } from '@angular/core';
import { product } from '../../../shared/interface';
import { OrderService } from 'src/app/services//order/order.service';
import { ProductsService } from 'src/app/services/products.service';
import Swiper, { Navigation, Pagination,Autoplay } from 'swiper';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit,AfterViewInit {

  products:product[];
  productos:any;

  constructor(private productSvc:ProductsService, private orderSvc:OrderService) { }

  ngOnInit(): void {
    this.products = this.productSvc.getAllProducts() 
    //TODO
    this.productSvc.getAllProductsapi().subscribe((res:any)=>{
      this.productos = res.productos;
      console.log(this.productos);
    }) 
  }

  ngAfterViewInit(){
    Swiper.use([Navigation, Pagination,Autoplay]);
    const swiper = new Swiper('.swiper', {
      // Optional parameters
      loop: true,
      autoplay:{
        disableOnInteraction:false,
        delay:3000,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  addCart(product:product){
    this.orderSvc.addCart(product)
  }
}
