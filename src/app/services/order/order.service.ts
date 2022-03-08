import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Productos } from 'src/app/admin/interface/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

export interface RtaMP {
  preferenceID: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  products:Productos[] = []
  private cart = new BehaviorSubject<Productos[]>([]);

  cart$ = this.cart.asObservable();

  constructor(private http:HttpClient) { }
//Ver cantidad en orden
  addCart(product:Productos){
    let repetido = this.products.find(p=>p._id == product._id)//Verificamos si el producto ya esta en el carrito
    if(repetido){
      repetido.cantidad++
    }else{
      product.cantidad = 1
      this.products.push(product)
    }
    this.cart.next(this.products)
  }

  deleteCart(id:string){
    this.products = [...this.products]
     const index = this.products.findIndex(obj => obj._id === id)
     let repetido = this.products.find(p=>p._id == id)
     repetido.cantidad = repetido.cantidad - 1
     if(repetido.cantidad === 0){
       this.products.splice(index, 1);
     }
     this.cart.next(this.products)
  }
  deleteAllCart(){
    this.products.splice(0,this.products.length)
    this.cart.next(this.products)
  }

  modalMP(productos){
    return this.http.post<RtaMP>(`${environment.API}/api/order`,productos)
  }

}
