import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  fontStyleControl = new FormControl();

  products:product[] = [
    {
      id:1,
      nombre:'top',
      precio:1500,
      img:'../../../assets/img-velka/post32.jpg',
      description:'blabla'  
    },
    {
      id:2,
      nombre:'top',
      precio:1500,
      img:'../../../assets/img-velka/post30.jpg',
      description:'blabla'  
    },
    {
      id:3,
      nombre:'top',
      precio:1500,
      img:'../../../assets/img-velka/post33.jpg',
      description:'blabla'  
    },
    {
      id:4,
      nombre:'top',
      precio:1500,
      img:'../../../assets/img-velka/post29.jpg',
      description:'blabla'  
    },
    { 
      id:5,
      nombre:'top',
      precio:1500,
      img:'../../../assets/img-velka/post31.jpg',
      description:'blabla'  
    },
    {
      id:6,
      nombre:'top',
      precio:1500,
      img:'../../../assets/img-velka/post34.jpg',
      description:'blabla'  
    },
    {
      id:7,
      nombre:'top',
      precio:1500,
      img:'../../../assets/img-velka/post55.jpg',
      description:'blabla'  
    },
    {
      id:8,
      nombre:'top',
      precio:1500,
      img:'../../../assets/img-velka/post41.jpg',
      description:'blabla'  
    },
    {
      id:9,
      nombre:'top',
      precio:1500,
      img:'../../../assets/img-velka/post36.jpg',
      description:'blabla'  
    },
    {
      id:10,
      nombre:'top',
      precio:1500,
      img:'../../../assets/img-velka/post43.jpg',
      description:'blabla'  
    },
    {
      id:11,
      nombre:'top',
      precio:1500,
      img:'../../../assets/img-velka/post47.jpg',
      description:'blabla'  
    },
    {
      id:12,
      nombre:'top',
      precio:1500,
      img:'../../../assets/img-velka/post59.jpg',
      description:'blabla'  
    },


  ]

  constructor() { }

  ngOnInit(): void {
  }

filtro(){
  console.log(this.fontStyleControl.value)
}
}
