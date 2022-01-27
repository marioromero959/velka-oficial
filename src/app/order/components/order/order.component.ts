import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Productos } from 'src/app/admin/interface/product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  disableButton:boolean = false;
  products$:Observable<Productos[]>;
  products:Productos[];
  dataClient: FormGroup;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

  constructor(private orderSvc:OrderService,private _formBuilder: FormBuilder) {
    this.products$ = this.orderSvc.cart$;
    this.products$.subscribe(products => {
      this.products = products;
    })
  }

   ngOnInit() {
    this.dataClient = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      telefono: ['', Validators.required],
      direction: ['', Validators.required],
    });
  }

  get nameField(){
    return this.dataClient.get('name');
  }
  get emailField(){
    return this.dataClient.get('email');
  }
  get surnameField(){
    return this.dataClient.get('surname');
  }
  get phField(){
    return this.dataClient.get('telefono');
  }
  get adressField(){
    return this.dataClient.get('direction');
  }
  
  errorEmail(){
    if (this.emailField?.hasError('required')) {
      return 'Debes escribir tu email';
    }
    return this.emailField?.hasError('pattern') ? 'No es un email válido' : '';
  }
  
  addCart(product:Productos){
    this.orderSvc.addCart(product)
  }
  deleteItem(productId){
    this.orderSvc.deleteCart(productId)
  }
  total(){
    let total = this.products
    .map(product=>product.precio)
    .reduce((a,b)=>a+b,0)
    return total
  }

    paid(){}
}
