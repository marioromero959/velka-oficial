import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { product } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  products:product[] = []
  private cart = new BehaviorSubject<product[]>([]);

  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(product:product){
    this.products = [...this.products,product]
    this.cart.next(this.products)
  }

}
