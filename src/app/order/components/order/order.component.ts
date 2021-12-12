import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter,map,tap } from 'rxjs/operators';
import { product } from 'src/app/interface';
import { OrderService } from 'src/app/services/order.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  disableButton:boolean = false;
  products$:Observable<product[]>;
  products:product[];
  dataClient: FormGroup;

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
      email: ['', [Validators.required, Validators.email]],
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
    return this.emailField?.hasError('email') ? 'No es un email válido' : '';
  }
  
  addCart(product:product){
    this.orderSvc.addCart(product)
  }
  deleteItem(product){
    this.orderSvc.deleteCart(product)
  }
  total(){
    let total = this.products
    .map(product=>product.precio)
    .reduce((a,b)=>a+b,0)
    return total
  }

    paid(){}
}
