import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { product } from 'src/app/interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  product:product;

  constructor(private route:ActivatedRoute, private productSvc:ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      const id = params.id;
      this.product = this.productSvc.getProduct(id);
    });
  }

}
