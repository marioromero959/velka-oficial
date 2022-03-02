import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Productos } from 'src/app/admin/interface/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  addCart(product:Productos){
    //todo revisar el agregar los productos
    this.products = [...this.products,product]
    console.log('productos',this.products);
    this.cart.next(this.products)
  }
  deleteCart(id:string){
    this.products = [...this.products]
     const index = this.products.findIndex(obj => obj._id === id)
     this.products.splice(index, 1);
     this.cart.next(this.products)
  }


  modalMP(data){
    return this.http.post<RtaMP>(`${environment.API}/api/order`,data)
  }

}
