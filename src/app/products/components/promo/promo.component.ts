import { Component, OnInit, AfterViewInit } from '@angular/core';
import { product } from 'src/app/interface';
import { ProductsService } from 'src/app/services/products.service';
import Swiper, { Navigation, Pagination,Autoplay } from 'swiper';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit,AfterViewInit {

  products:product[];

  constructor(private productSvc:ProductsService) { }

  ngOnInit(): void {
    this.products = this.productSvc.getAllProducts() 
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

}
