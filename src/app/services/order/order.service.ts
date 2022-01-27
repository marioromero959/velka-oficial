import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Productos } from 'src/app/admin/interface/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  products:Productos[] = []
  private cart = new BehaviorSubject<Productos[]>([]);

  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(product:Productos){
    this.products = [...this.products,product]
    this.cart.next(this.products)
  }
  deleteCart(id:string){
    this.products = [...this.products]
     const index = this.products.findIndex(obj => obj._id === id)
     this.products.splice(index, 1);
     this.cart.next(this.products)
  }

}
