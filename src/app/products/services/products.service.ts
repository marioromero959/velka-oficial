import { Injectable } from '@angular/core';
import { product } from '../../shared/interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products:product[] = [
    {
      id:1,
      nombre:'blusa',
      precio:1500,
      img:'../../../assets/img-velka/post32.jpg',
      description:'blabla'  
    },
    {
      id:2,
      nombre:'blusa',
      precio:1500,
      img:'../../../assets/img-velka/post30.jpg',
      description:'blabla'  
    },
    {
      id:3,
      nombre:'blusa',
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
      nombre:'acc',
      precio:1500,
      img:'../../../assets/img-velka/post55.jpg',
      description:'blabla'  
    },
    {
      id:8,
      nombre:'acc',
      precio:1500,
      img:'../../../assets/img-velka/post41.jpg',
      description:'blabla'  
    },
    {
      id:9,
      nombre:'acc',
      precio:1500,
      img:'../../../assets/img-velka/post36.jpg',
      description:'blabla'  
    },
    {
      id:10,
      nombre:'mono',
      precio:1500,
      img:'../../../assets/img-velka/post43.jpg',
      description:'blabla'  
    },
    {
      id:11,
      nombre:'mono',
      precio:1500,
      img:'../../../assets/img-velka/post47.jpg',
      description:'blabla'  
    },
    {
      id:12,
      nombre:'mono',
      precio:1500,
      img:'../../../assets/img-velka/post59.jpg',
      description:'blabla'  
    },

  ]

  constructor(private http:HttpClient) { }

  //TODO:borrar
  getAllProducts(){
    return this.products;
  }
  getProduct(id:number){
    return this.products.find(item => id === item.id)
  }

  getAllProductsapi(){
    return this.http.get(`${environment.API}/api/productos`);
  }
  getProductapi(id){
    return this.http.get(`${environment.API}/api/productos/${id}`);
  }
}
